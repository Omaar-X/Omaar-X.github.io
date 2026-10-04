// Build the static export into out/ (GitHub Pages). Cross-platform wrapper for
// `STATIC_EXPORT=true npm run build`, which does not work in Windows shells.
//
// Usage: npm run export

import { spawnSync } from "node:child_process";

const result = spawnSync("npm", ["run", "build"], {
  stdio: "inherit",
  shell: true,
  env: { ...process.env, STATIC_EXPORT: "true" },
});

process.exit(result.status ?? 1);
