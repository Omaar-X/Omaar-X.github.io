// Serve the static export (out/) locally, the way GitHub Pages serves it:
//   - /dir  ->  301 /dir/   (directory index.html)
//   - unknown paths -> 404.html with a 404 status
//   - text assets are gzip-compressed, MIME types come from the file extension only
// Zero dependencies.   Usage: node tools/serve-export.mjs [dir=out] [port=3200]

import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize, resolve, sep } from "node:path";
import { pipeline } from "node:stream";
import { createGzip } from "node:zlib";

const root = resolve(process.argv[2] ?? "out");
const port = Number(process.argv[3] ?? 3200);

if (!existsSync(join(root, "index.html"))) {
  console.error(`No static export found in ${root}. Run \`STATIC_EXPORT=true npm run build\` first.`);
  process.exit(1);
}

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".pdf": "application/pdf",
};
const compressible = new Set([".html", ".css", ".js", ".json", ".txt", ".xml", ".svg"]);

function resolveFile(pathname) {
  const target = normalize(join(root, decodeURIComponent(pathname)));
  if (target !== root && !target.startsWith(root + sep)) return null;
  if (existsSync(target) && statSync(target).isFile()) return target;
  const index = join(target, "index.html");
  if (existsSync(index)) return index;
  return null;
}

createServer((request, response) => {
  const { pathname } = new URL(request.url ?? "/", "http://localhost");
  const isDirectory = existsSync(join(root, pathname)) && statSync(join(root, pathname)).isDirectory();

  if (isDirectory && !pathname.endsWith("/")) {
    response.writeHead(301, { Location: `${pathname}/` }).end();
    return;
  }

  const file = resolveFile(pathname);
  const status = file ? 200 : 404;
  const served = file ?? join(root, "404.html");
  const extension = extname(served);
  const headers = {
    // Extension-less files are served as application/octet-stream, like GitHub Pages.
    "Content-Type": types[extension] ?? "application/octet-stream",
    "Cache-Control": "max-age=600",
  };

  const gzip = compressible.has(extension) && /\bgzip\b/.test(request.headers["accept-encoding"] ?? "");
  if (gzip) headers["Content-Encoding"] = "gzip";

  response.writeHead(status, headers);
  if (request.method === "HEAD") {
    response.end();
    return;
  }
  const stream = createReadStream(served);
  pipeline(gzip ? [stream, createGzip(), response] : [stream, response], () => {});
}).listen(port, () => {
  console.log(`Serving ${root} at http://localhost:${port}`);
});
