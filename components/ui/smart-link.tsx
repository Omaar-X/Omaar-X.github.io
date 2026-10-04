import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

export type SmartLinkProps = Omit<ComponentPropsWithoutRef<"a">, "href"> & {
  href: string;
  external?: boolean;
};

export function isExternalHref(href: string) {
  return /^https?:\/\//.test(href);
}

function isPlainAnchor(href: string) {
  return /^(mailto:|tel:|#)/.test(href) || /\.[a-z0-9]+$/i.test(href);
}

export function SmartLink({ href, external, children, ...rest }: SmartLinkProps) {
  if (external ?? isExternalHref(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }

  if (isPlainAnchor(href) || rest.download !== undefined) {
    return (
      <a href={href} {...rest}>
        {children}
      </a>
    );
  }

  // Prefetching a dynamic route requests an RSC segment file that the static export writes under a
  // different name, which 404s in the console. Navigation itself works without it.
  return (
    <Link href={href} prefetch={href.startsWith("/work/") ? false : undefined} {...rest}>
      {children}
    </Link>
  );
}
