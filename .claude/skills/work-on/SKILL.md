---
name: work-on
description: Do development work on this project - build a UI feature from a description and/or Figma screenshot, connect the frontend to an existing backend endpoint (REST read/write), or fix a bug. Use for any request to build, add, change, wire, connect or fix a screen, page, form, table, dialog, query, mutation or defect. Always reuses the vendored web-ui components (src/components/web-ui); forms follow the form reference (useAppForm + App* field wrappers).
argument-hint: "<what to build / connect / fix> [screenshot path or Figma link] [endpoint]"
---

# /work-on

Do the work in `$ARGUMENTS`. **web-ui first, always.** Hand-rolled markup or raw HeroUI
is the last resort, not the default.

Examples:
- `/work-on add onboarding form from <screenshot>`
- `/work-on connect UserTable to GET /api/admin/users`
- `/work-on fix: sign-in error doesn't show on empty submit`

## Sources of truth (read from disk, never from memory)

| What | Where |
|---|---|
| Available components | `src/components/web-ui/components/*/` (one folder per `App*`), exported by `src/components/web-ui/index.ts` |
| Components not in web-ui | this project only vendors what the landing page uses. The full kit and its labs are in project-template (ask the user where it is checked out)/components/`, `src/features/*` for query/mutation/form examples); see "Missing component" below |
| Props | the component's own `.tsx` (JSDoc at the top explains intent and gotchas) |
| Forms | `src/hooks/use-app-form.ts` plus the `App*` field wrappers (copy any missing ones from project-template) |
| Project-owned components | `src/components/project/` |
| API layer | `src/lib/api/api-client.ts` (`apiFetch`, `ApiError`), `src/lib/api/` , `classifyError` |
| Query / mutation examples | none yet in this project; follow the shape in Mode B |
| Real UI examples | `src/features/landing/components/*` |

The component list changes. Re-list the folder every run; do not trust a list in this file.

Imports: `import { AppButton, ... } from "@/components/web-ui"`. Project components from
`@/components/project`. There is no web-ui npm package; never import one.

## Step 0 - Pick the mode(s)

State which mode(s) apply in your first message. A request can combine them
(e.g. a form that posts to an endpoint = Build UI + Connect backend).

| Mode | Trigger |
|---|---|
| **A. Build UI** | new/changed screen, form, table, dialog, from a description and/or screenshot |
| **B. Connect backend** | wire UI to an existing endpoint (GET/POST/PUT/PATCH/DELETE) |
| **C. Fix bug** | something behaves wrongly, errors, or looks wrong |

Ask the user only when something blocks the work (unknown endpoint contract, ambiguous
expected behavior). Otherwise state assumptions and proceed.

---

## Mode A - Build UI

### A1. Understand the input
- If a screenshot or Figma link is given, view it (Read the image). List every UI element:
  layout, headings, fields, buttons, checkboxes, accordions, tables, tabs, dialogs, alerts,
  empty/loading/error states, icons.
- With only a description, derive the same list and state assumptions.
- Text: use `<Typography type="...">` from `@heroui/react` (see CLAUDE.md). An explicit
  Figma text style wins; never invent a size otherwise.

### A2. Map elements to web-ui components
List `src/components/web-ui/components/`, then produce this table **before writing code**
and show it in your reply:

| UI element | web-ui component | Source checked | Status |
|---|---|---|---|
| Primary action | AppButton | AppButton/AppButton.tsx | reuse |
| Form field | AppInputGroup | not in web-ui | copy from project-template |
| Rating pill | (none) | - | wrap / gap |

Open each match's component file to learn real props/variants.
Statuses: `reuse` | `copy` (exists in project-template, not vendored here yet) | `wrap` (needs
different behavior) | `gap` (nothing fits).

### A3. Reuse rules (in priority order)
1. **Reuse** the web-ui component as-is.
2. **Wrap** it in `src/components/project/<Name>/` if behavior must differ. Never edit
   anything under `src/components/web-ui/` (verbatim vendored copy). A new project
   component needs its folder, an `index.ts` barrel and an export from
   `components/project/index.ts`.
3. **Missing component.** web-ui here is trimmed to what the landing page uses. If a
   needed `App*` component is not in `src/components/web-ui/components/`, do NOT hand-build
   it: copy its folder verbatim from project-template's `src/components/web-ui/components/` and add its `export *` line to
   `src/components/web-ui/index.ts`. Read its lab under the template's `src/routes/(references)/components/` for usage. If the template folder is missing, stop and ask. List
   every component you brought in.
4. **Gap**: only if no web-ui component can be composed to fit, use HeroUI v3 compound
   components directly, say so in the summary, keep it in the feature folder.
Check composites before building from primitives (in web-ui or project-template): `AppDataTable` vs `AppTable`,
`AppModal`/`AppDialog`/`AppDrawer`, `AppFilterBar`, `AppStepper`, `AppEmptyState`,
`AppPageHeader`, `AppAlert`, `AppToaster`.

### A4. Forms (any input, validation or submit)
Use the project's form pattern; do not invent one. The reference page was removed, so read
`src/hooks/use-app-form.ts` and the field wrappers' source (copy them first if missing, rule A3.3).
- Create the form with **`useAppForm(schema, { defaultValues })`** from
  `@/hooks/use-app-form` (on-blur validation, re-validate on change, `values` for edit
  forms). Plain `useForm` only with a comment saying why.
- Zod schema defined **outside** the component; short, human messages:
  `"Email is required"`; never Zod defaults, never "This field is required".
- Fields are `App*` wrappers bound with `control` + `name` (`AppInputGroup`, `AppTextArea`,
  `AppNumberField`, `AppSelect`, `AppComboBox`, `AppAutocomplete`, `AppCheckbox`,
  `AppCheckboxGroup`, `AppRadioGroup`, `AppSwitch`, `AppDatePicker`, `AppDateRangeField`,
  `AppTimeField`, `AppFileUpload`, `AppPasswordField`, `AppReadOnlyField`). Check the
  wrapper's source for each one's value type (CalendarDate, Time, string[]...).
- Required fields: pass `isRequired` (wrapper draws the red `*`). **Optional fields get
  nothing: no asterisk, no "Optional"/"(optional)" text anywhere.** Schema and `isRequired`
  must agree.
- Submit through `handleSubmit(fn)`, never a custom handler that skips it, so an untouched
  form shows every error. Submit button: `AppButton type="submit"` with loading state.
- No custom error `<p>`/`<span>`. Field errors come from the wrapper; form-level API
  errors go in `AppAlert` or the toaster.
- Uploads: "File uploads" in CLAUDE.md (`lib/upload/`).

### A5. Place the code
- Feature UI in `src/features/<domain>/components/`; routes in `src/routes/` stay thin glue
  (`createFileRoute`, `head` meta, `staticData.breadcrumb`).
- Promote to `components/project/` only when a second domain needs it.

---

## Mode B - Connect backend

The backend is a separate service. This app only calls it.

### B1. Get the contract (do not invent it)
- Need: method, path, request body/params, response shape, error codes, auth requirement.
- Sources, in order: the user's message, existing types/queries in the repo, a sample
  response or OpenAPI/docs the user points to. If none exist, **ask** for the shape or a
  sample response. Never guess field names.
- Server-only SDKs (Prisma, AWS, Resend, Better Auth server) are forbidden here
  (`.dependency-cruiser.cjs`). Auth is via `authClient` / session cookie.

### B2. Write the API layer
- One `*.query.ts` per endpoint under `features/<name>/api/`, exporting `queryOptions` and
  a `*_QUERY_KEY` const, with a `/** METHOD /api/... on the backend. */` doc comment and
  exported request/response types. Shape:
  `export const X_QUERY_KEY = [...] as const; export const xQueryOptions = (p) => queryOptions({ queryFn: () => apiFetch<T>(path), queryKey: [...X_QUERY_KEY, p] as const })`.
- Always `apiFetch` from `@/lib/api/api-client`; never raw `fetch`, never `process.env`
  (use `env` from `src/env.ts`). `apiFetch` sends the cookie and throws `ApiError`
  (`status`, `code`, `message`) on non-2xx.
- Writes: `useMutation` in a `features/<name>/hooks/` hook: toast on
  success/error (`toast` from `@heroui/react`), then
  `queryClient.invalidateQueries` for every query the write makes stale.
- Validate untrusted response data with Zod only if the project already does so for similar
  endpoints; otherwise rely on the typed contract.

### B3. Wire the UI (still web-ui first)
- Loading: skeletons / `isPending` state on `AppButton`. Empty: `AppEmptyState`. Error:
  `AppErrorState` / `AppAlert`, using `classifyError`. Copy any that are missing from
  project-template first (rule A3.3).
- Forms posting data: Mode A4 rules plus map server field errors back with `setError` when
  the backend returns them; a general failure goes to `AppAlert`/toast.
- Tables over server data: `AppDataTable`/`AppTable` + `AppPagination`; keep page/filter
  state in the query key.
- Protected data: routes check session in `beforeLoad` (`features/auth/lib/session.ts`).

---

## Mode C - Fix bug

1. **Reproduce.** Read the code path, run the app (`npm run dev`, port 4000) or a test to
   see the failure. If it cannot be reproduced, say so and ask for steps.
2. **Find the root cause** before editing. State it in one or two sentences. Check the
   usual suspects for this repo: form not using `handleSubmit`/`useAppForm`, `isRequired`
   vs schema mismatch, field `name` not matching schema key, missing `defaultValues`,
   wrong value type for an `App*` wrapper, stale query key / missing invalidation, wrong
   `ApiError` handling, route guard in `beforeLoad`.
3. **Smallest fix** that addresses the cause. Do not refactor around it. If the cause is
   inside `src/components/web-ui/`, do **not** edit it: wrap/work around it in
   `components/project/` or the feature and report the upstream issue to the user.
4. **Prove it.** Add or update a test when there is a seam for one (`npm run test`);
   otherwise re-run the repro and say what you observed.

---

## Cypress hooks: `data-cy` (all modes that touch UI)

Every new or changed UI must be Cypress-ready. The attribute is **`data-cy`** (never
`cy-data`, `data-testid` or `data-test`). Specs select with `[data-cy="x"]`.

- **Put it on every interactive or asserted element:** each form field, submit/cancel
  buttons, links that navigate, checkboxes/switches, tabs, accordion items, dialogs/modals
  (and their confirm/close), table (and row action buttons), alerts/error summaries, empty
  and loading states, and the screen root (`<feature>-page`).
- **web-ui components take a `data-cy` prop** and put it on their outermost element
  (check the component's props; `AppInputGroup`, `AppButton`, `AppTabs`... do). Pass it as a
  prop. Do not wrap an element in a `<div data-cy>` just to carry it. If a web-ui component
  has no `data-cy` prop, wrap it in `components/project/` and add the prop there; never edit
  web-ui, and mention it in the report.
- **Naming:** kebab-case, `<feature>-<element>[-<qualifier>]`, e.g. `sign-in-email`,
  `sign-in-submit`, `user-table`, `user-table-row-delete`. Hooks describe *what it is*, not
  how it looks or where it sits (no `blue-button`, `second-input`).
- **Unique per page.** Two instances never share one. Repeated items derive from the id:
  `` data-cy={`user-row-${user.id}`} ``.
- **Stable.** Do not build a hook from user-visible text that can change or be translated.
- **Selecting inside a component:** specs scope with the hook, then use the inner element
  (`[data-cy="x"] input`, `[data-cy="x"] textarea`); keep it to one hook per component.
  Do not add a hook to every inner element.
- **Specs:** writing a Cypress spec is only done when asked, but the hooks are never
  optional. Mention the hooks you added (and the key ones) in the report so a spec can be
  written against them.

## Verify (all modes)

- Every interactive/asserted element in the change has a unique `data-cy`.

- JSX attributes alphabetical, no `as any`, no unused vars, `onPress` not `onClick`,
  semantic variants only (`primary`, `danger`, ...), `Number.isNaN` not `isNaN`.
- Run `npm run check` (Biome + boundaries) and `npm run test` when tests are touched or
  Mode C. Fix failures; never report done on a red check.
- For UI work, if the dev server can run, open the screen and compare with the screenshot;
  mention visible differences.
- Update `web-ui-usage.md` (git-ignored, repo root) if it exists, per CLAUDE.md.

## Report

End with, briefly: mode(s) used; the component mapping table with final statuses (A);
endpoint(s) wired and the query keys invalidated (B); root cause and fix (C); files
created/changed; the `data-cy` hooks added (key ones); any `wrap`/`gap` and why; check
results.
