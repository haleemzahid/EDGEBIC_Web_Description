# Project rules

These rules override default behavior. Follow them exactly.

## 1. Always reuse existing infrastructure

- Before writing anything new, look for existing components, hooks, utilities, schemas, data fetchers, and patterns in this repo and use them.
- Do not hand-roll styled `<a>`, `<button>`, `<input>`, table markup, modals, or layout primitives when a component already exists in `components/ui/`, `components/dashboard/`, or elsewhere.
- Do not invent new search-params helpers, data-fetching wrappers, caching keys, or auth gates when one already exists for a sibling feature — copy the sibling pattern instead.
- If you are about to write something that feels generic, stop and search the codebase first.

## 2. Tables must follow the Contacts page pattern

Whenever you build, edit, or refactor a table page, it MUST mirror the Contacts page architecture:

- Page shell: [app/(app)/dashboard/contacts/page.tsx](app/(app)/dashboard/contacts/page.tsx)
  - `TransitionProvider` → `Page` → `PageHeader` (`PagePrimaryBar` with `PageTitle` + `InfoIcon` tooltip total, optional `PageActions`; `PageSecondaryBar` with filters wrapped in `<React.Suspense>`) → `PageBody` with the table or empty state inside `<React.Suspense>`.
  - `searchParamsCache.parse(searchParams)` from a co-located `*-search-params.ts` file built with `nuqs/server`.
  - `export const dynamic = 'force-dynamic'` and `export const revalidate = 0`.
- Table component: [components/dashboard/contacts/contacts-data-table.tsx](components/dashboard/contacts/contacts-data-table.tsx)
  - `useReactTable` from `@tanstack/react-table`.
  - `useQueryStates` from `nuqs` for sort and pagination (bound to the same search-params file as the page).
  - `useTransitionContext` for the loading spinner.
  - 10-second visibility-aware `router.refresh()` polling.
  - `<ScrollArea verticalScrollBar horizontalScrollBar>` wrapping `<DataTable fixedHeader wrapperClassName="h-[calc(100svh-177px)] overflow-visible">`.
  - `<DataTablePagination>` below the table; `<CenteredSpinner>` while loading.
  - All column headers use `<DataTableColumnHeader>`. Cell text uses `text-sm`. Right-most column uses `<DataTableColumnOptionsHeader>` for column show/hide.
  - Buttons inside cells use `<Button>` from `components/ui/button.tsx` (use `asChild` to wrap an `<a>`); never hand-roll button styling.

## 3. Never commit code without explicit permission

- Do not run `git commit`, `git add` followed by commit, or any command that creates a commit unless I have explicitly asked for it in the current message.
- Do not run `git push`, `git rebase`, `git reset --hard`, `git checkout --`, or any history-rewriting command without explicit permission.
- It is fine to read with `git status`, `git diff`, `git log` whenever helpful.

## 4. Never run migrations without explicit permission

- Do not run `prisma migrate dev`, `prisma migrate deploy`, `prisma db push`, `prisma migrate reset`, or any other schema-applying or data-altering command unless I have explicitly asked for it in the current message.
- It is fine to read with `prisma generate`, `prisma format`, or to inspect schema files.
- If a task seems to require a migration, stop and ask first.

## 5. Never run my code without explicit permission

- Do not start the app or any server: `npm run dev`, `next dev`, `next start`, `next build`, etc.
- Do not execute scripts, tests, or DB queries against my project: `npm`/`pnpm`/`node`/`npx tsx` scripts, test runners, seed/query scripts, or anything that executes project code or hits the database.
- Writing/editing files is fine. Read-only inspection (`git status`/`diff`/`log`) is fine. Static checks like `tsc --noEmit` are fine ONLY if I asked for verification — otherwise just write the code and tell me how to run it myself.
- When something needs to be run (dev server, a test, a curl/test command), give me the exact command to run myself and STOP. Do not run it for me.
- If verifying requires running code, ask first and wait for an explicit "yes".
