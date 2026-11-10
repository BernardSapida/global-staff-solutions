// Sitemap - paths worth Google's time, i.e. indexable and not behind auth.
// Consumed by `src/routes/sitemap[.]xml.ts`. GSS is a one-page site: every
// section lives on "/", so that is the only indexable path.
export const PUBLIC_ROUTES = ["/"];
