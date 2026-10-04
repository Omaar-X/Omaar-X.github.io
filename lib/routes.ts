/**
 * Canonical URL policy: every route except the home page ends with a trailing slash. It matches the
 * static export (`trailingSlash: true`, one `index.html` per directory) and GitHub Pages, so
 * canonical, Open Graph, sitemap, structured data and internal links all use the same form.
 */
export const caseStudyPath = (slug: string) => `/work/${slug}/` as const;
