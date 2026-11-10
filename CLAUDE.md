# GSS Global Staff Solutions

A frontend-only TanStack Start app. There is no database, ORM or auth server
here: the backend owns all of that, and this app calls its endpoints.

## Commands

- **Dev:** `npm run dev` (port 4000)
- **Build:** `npm run build`
- **Lint/Format/Typecheck:** `npm run check` (Biome, then `dependency-cruiser` boundary rules)
- **Boundary rules only:** `npm run boundaries`
- **Tests:** `npm run test`

## Stack

- **Framework:** TanStack Start (React 19, file-based routing via TanStack Router)
- **UI:** HeroUI v3 + Tailwind CSS v4 - compound component pattern, no Provider needed
- **Icons:** Lucide React
- **Forms:** React Hook Form + Zod v4 + `@hookform/resolvers`
- **Server state:** TanStack Query, fetching through `src/lib/api/api-client.ts`
- **Client state:** Zustand
- **Auth:** none at the moment. GSS is a one-page landing site; the sign-in, sign-up,
  dashboard, profile and admin pages were removed. Restore them from git history if needed.
- **Env validation:** T3Env (`src/env.ts`) - import `env` from there, never `process.env` directly
- **Linter/Formatter:** Biome

## Environment Variables

Use **`.env` or `.env.local`** - Vite loads both and `.env.local` wins. See `.env.example`.

```
VITE_BASE_URL=http://localhost:4000   # this app's origin, no trailing slash
VITE_API_URL=http://localhost:3000    # the backend's origin, no trailing slash
```

The backend must allow `VITE_BASE_URL` in its CORS.

## Talking to the backend

- Plain requests: `apiFetch` from `src/lib/api/api-client.ts`. It sends the
  session cookie, and throws `ApiError` (`status`, `code`, `message`) on non-2xx.
  `classifyError` understands it.
- One `*.query.ts` per endpoint under `features/<name>/api/`, exporting
  `queryOptions` plus a `*_QUERY_KEY` const and the request/response types. No endpoint
  is wired yet; `/work-on` describes the shape.
- Server-only vendor SDKs (Prisma, AWS, Resend, Better Auth's server package)
  are forbidden by `.dependency-cruiser.cjs`.

## File uploads

Uploads are deferred to submit and go straight to S3 with a URL the backend
presigns (`POST /api/upload/presign`, `POST /api/upload/remove`). See
`lib/upload/` - `useDeferredUpload`, `useUploadingSubmit`, `pending-uploads.ts`.
Put `storedImageUrl` on every stored field an image URL can reach.

## Project Structure

```
src/
  components/
    web-ui/      # Component Labs (vendored UI kit, trimmed to what the page uses)
    project/     # This project's own components
  features/      # Feature slices: landing/ (the page)
  integrations/  # tanstack-query provider + devtools
  hooks/         # Shared hooks
  lib/           # api/, upload/
  store/         # Zustand stores
  config/        # navigation.config.ts, seo.config.ts, query-client.ts
  types/         # Shared TS types
  utils/         # cn.ts, format.ts, config.ts
  routes/        # TanStack Router file-based routes - thin glue only
  env.ts         # T3Env validated environment
```

## Component Conventions

There are exactly **two** kinds of component, and which one you are writing
decides where the file goes:

| | Lives in | Who owns it |
|---|---|---|
| **Component Labs** | `src/components/web-ui/` (vendored, verbatim copy) | project-template. Never edited here |
| **Project Components** | `src/components/project/<Name>/` | this project. Never synced, never overwritten |

**Never edit a Component Lab from here** - it is a verbatim vendored copy (see its
`internal.ts`) and the next sync would overwrite it. When one has
to behave differently, wrap it in `components/project/`. `ThemeToggle` is the
worked example: `AppThemeToggle` is props in, markup out, and the binding to
`ui.store` lives in the wrapper.

Import Component Labs from `@/components/web-ui` and this project's own from
`@/components/project`. Domain-specific components stay in
`features/<domain>/components/`; promote to `components/project/` only when a
second domain needs one.

Every folder has an `index.ts` barrel, and every Project Component is exported
from `components/project/index.ts`.

`src/components/web-ui` is a vendored copy of the source in project-template (there is no
published npm package). **It only contains the components the landing page uses**
(AppBackdrop, AppButton, AppErrorState, AppLogo, AppNotFound, AppRouteProgress,
AppSiteFooter, AppSiteHeader, AppThemeToggle, AppToaster, AppTooltip). The rest of the
kit and its lab pages were deliberately left out. When a feature needs another `App*`
component, copy that component's folder verbatim from project-template into
`src/components/web-ui/components/` and add its `export *` line to
`src/components/web-ui/index.ts`. Do not rebuild it by hand.

### All text goes through `<Typography type="…" />`

HeroUI's `Typography`, imported raw from `@heroui/react`. There is no
`AppTypography` and there is never going to be one - the type scale IS HeroUI's
(`h1`-`h6`, `body`, `body-sm`, `body-xs`, `code`), and a wrapper would only be a
second name for the same thing.

```tsx
import { Typography } from "@heroui/react";

<Typography type="h2">Billing</Typography>
<Typography color="muted" type="body-sm">Updated 2 minutes ago.</Typography>
```

- **`type` is chosen by what the text IS, not by how big it should look.**
  `h1`-`h6` for titles, `body` / `body-sm` / `body-xs` for paragraphs and
  supporting copy, `code` for code. Reaching for `h4` because it happens to be
  the right size for a caption is the failure this rule exists to stop.
- `Typography.Heading level={n}` renders a real `<h1>`-`<h6>` element - use it
  when the text is a heading in the document outline, not only in the type
  scale. `Typography` alone renders a `<span>`, which is right for a label that
  merely looks large.
- `align`, `color="muted"`, `truncate` and `weight` are props. Do not reach for
  `text-sm text-muted font-semibold` to say something the props already say.
- **The one exception: a text style the design sets explicitly.** When Figma
  gives a piece of text its own size / weight / line-height, that value wins -
  set it on the element. Landing pages, hero copy and CTAs are where this
  happens. Where Figma sets nothing, it is `Typography`; never invent a size.

**Breadcrumbs:** Use `useRouteBreadcrumbs` + add `staticData: { breadcrumb: "Label" }` to route definitions

## HeroUI v3 Rules

- **Compound components always:** `<Card><Card.Header>` not `<Card title="x">`
- **No Provider** — HeroUI v3 needs none
- **Semantic variants:** `primary`, `secondary`, `tertiary`, `danger`, `ghost` — no raw colors
- **Use `onPress`** not `onClick`
- **Check web-ui first.** Before reaching for raw HeroUI, look for an `App*` component in
  `src/components/web-ui/components/`, and if it is not there check project-template.
  For a raw HeroUI component, read its types in `node_modules/@heroui/react`.

## Code Rules (Biome enforced)

- JSX attributes must be **alphabetically sorted**
- Use `Number.isNaN()` — never `isNaN()`
- No `as any` — use `Record<string, unknown>` or proper generics
- No unused variables or parameters
- `forEach` callbacks must not return values — use `for...of` if you need early returns

## Path Aliases

`@/*` resolves to `src/*`:
- `@/components/web-ui` → `src/components/web-ui`
- `@/lib/api/api-client` → `src/lib/api/api-client`

## SEO & Metadata

- **Site identity:** `src/config/seo.config.ts` - `APP_NAME`, `APP_DESCRIPTION`, `ogImage`. Update these first when customizing the project; every route's `seo.title()` and default OG/Twitter tags derive from here.
- **Per-route meta:** every indexable route's `head()` sets `title`, `description`, `og:title`, `og:description`, `og:image`, `og:url`, `og:type`, `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`, `twitter:url`, and a `links: [{ rel: "canonical", ... }]` - copy the shape from `index.tsx`, not just `title`+`description`. `twitter:image`/`twitter:url` are easy to drop since Twitter/X falls back to the `og:*` pair for everything else - it does not fall back for those two, so an X card silently renders with no image at all. Check the TanStack Devtools SEO panel's Social previews tab, not just this list, since it names exactly which tag is missing per network. A route behind auth or otherwise not meant for search engines sets `{ name: "robots", content: "noindex" }` instead.
- **Structured data:** add via `{ "script:ld+json": {...} }` inside a route's `meta` array - TanStack Router renders it as a `<script type="application/ld+json">` natively, no extra plumbing. `index.tsx` ships a `WebSite` schema; `Organization` and `FAQPage` schemas sit beside it.
- **Sitemap:** `src/config/sitemap.config.ts` exports `PUBLIC_ROUTES` - add every new indexable path here. A project with dynamic content (blog posts, products, a portfolio's projects) spreads its own generated paths in alongside these; `src/routes/sitemap[.]xml.ts` serves the result at `/sitemap.xml`.
- **`robots.txt` is a route, not a `public/` file** (`src/routes/robots[.]txt.ts`) - its `Sitemap:` line needs `VITE_BASE_URL`, which is only known at request time. Never add a static `public/robots.txt`; it would shadow the route and go stale the moment the domain changes.
- **Favicon/manifest:** already wired in `__root.tsx` (`<link rel="icon">` / `<link rel="manifest">`) pointing at `public/favicon.ico` / `public/manifest.json`. Replace those two files with the project's own branding; update `manifest.json`'s `name`/`short_name` to match `APP_NAME`.
- **OG image:** `public/og-image.png` does not ship in the template - `seo.ogImage` references it, so every clone must add one (ideally ~1200x630) before the first real deploy, or every social share shows a broken image.

## web-ui ledger

`web-ui-usage.md` (git-ignored, repo root) records which `@/components/web-ui` components the project uses and where. Update it in the same change whenever one is added or dropped.

## Skills

- **`/work-on`:** `.claude/skills/work-on/` - build a UI feature, connect an existing backend endpoint, or fix a bug. Reuses `@/components/web-ui`, follows the form reference (`useAppForm`), and adds `data-cy` hooks for Cypress.
