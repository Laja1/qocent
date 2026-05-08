# Coding patterns — QocentFrontend

This document describes **how this repository is structured and how to extend it**. It is the source of truth for
cross-cutting conventions. If something here conflicts with an old habit, **this repo wins**.

---

## Table of contents

1. [Tech stack](#tech-stack)
2. [Directory layout](#directory-layout)
3. [Naming conventions](#naming-conventions)
4. [API layer (RTK Query)](#api-layer-rtk-query)
5. [HTTP client & auth](#http-client--auth)
6. [Models (`src/models`)](#models-srcmodels)
7. [Validation / Yup schemas (`src/utilities/schema`)](#validation--yup-schemas-srcutilitiesschema)
8. [Tables (`DataTable` + columns)](#tables-datatable--columns)
9. [Button](#button)
10. [Input](#input)
11. [Select (`SelectField`)](#select-selectfield)
12. [Modals (Nice Modal + legacy ModalProvider)](#modals-nice-modal--legacy-modalprovider)
13. [Forms, toast, errors](#forms-toast-errors)
14. [Dashboard navigation](#dashboard-navigation)
15. [Lint & format](#lint--format)
16. [Common gotchas](#common-gotchas)
17. [Migration targets](#migration-targets)

---

## Tech stack

| Area | What this project uses |
|------|-------------------------|
| Framework | **Vite 6** + **React 19** |
| Language | **TypeScript** (strict) |
| Styling | **Tailwind CSS v4**, `cn()` from `@/lib/utils` |
| Icons | **Lucide React** (primary), **Tabler** where already used |
| Server state | **Redux Toolkit** + **RTK Query** (`@reduxjs/toolkit`) |
| Client persistence | **redux-persist** (e.g. `auth` slice) |
| Forms | **Formik** + **Yup** (`utilities/schema`) in forms/modals |
| Modals | **@ebay/nice-modal-react** (primary) + **legacy `ModalProvider`** (`components/shared/modal.tsx`) |
| Feedback | **react-toastify** (`toast`) |
| Lint / format | **ESLint** (`pnpm lint`) |

There is **no AG Grid** in this app. Lists use the shared **`DataTable`** in [`src/components/shared/datatable.tsx`](src/components/shared/datatable.tsx).

---

## Directory layout

High-level `src/` layout (not every file):

```
src/
├── main.tsx                  # Vite entrypoint
├── App.tsx
├── router/                   # routes, route-config, route-renderer, guards
├── pages/                    # Route-level pages
├── components/
│   ├── shared/               # DataTable, sidebar, Header, SelectField, modal/, toast, …
│   ├── layouts/              # DashboardLayoutRouter, authLayout, …
│   ├── modal/                # Additional modal layouts as needed
│   ├── not-shared/           # One-off marketing / feature visuals
│   └── ui/                   # shadcn-style primitives (button, input, card, …)
├── service/
│   ├── httpClient/           # baseQuery.ts, baseQueryKotlin.ts, errorHandler.ts
│   ├── python/               # Python/Lambda API RTK slices (e.g. authApi, baseApi / pythonBaseApi)
│   └── kotlin/               # Kotlin backend RTK slices (e.g. siteApi, resourceApi)
├── store/                    # Redux store, slices (authSlice, accountSlice, …)
├── models/
│   ├── request/
│   └── response/
├── utilities/                # Note: named utilities/, not utils/
│   ├── schema/               # Yup schemas
│   ├── constants/            # e.g. column defs (legacy typo: colums.tsx)
│   └── enums.ts
├── lib/                      # e.g. utils (cn)
├── providers/
└── config/
```

- **`components/ui`**: design-system primitives (`Button`, `Input`, `Card`, …).
- **`components/shared`**: product UI including **`DataTable`**, **`SelectField`** (`selectfield.tsx`), not under `ui/`.
- **`service/python`** vs **`service/kotlin`**: separate RTK `createApi` instances per backend; see [API layer](#api-layer-rtk-query).

---

## Naming conventions

| Kind | Convention | Examples |
|------|------------|----------|
| React components | PascalCase file + export | `Header.tsx`, `DataTable` |
| Pages | `index.tsx` or `<feature>.tsx` in `pages/*` | `pages/billings/index.tsx` |
| API files | `*Api.ts`, camelCase hooks from RTK | `accountsApi.ts` → `useGetAccountQuery` |
| Models | **singular** folder names | `models/request`, `models/response` |
| Yup | **`*Schema` exports** in `utilities/schema` | `authSchema`, `resourceSchema` |
| Table columns | Often colocated in `utilities/constants/colums.tsx` or next to the page | `resourcesColumns`, `serverHouseColumn` |
| RTK | Multiple reducer paths; **`pythonBaseApi`** uses `injectEndpoints` for wallet/billing only today | See store registration |

---

## API layer (RTK Query)

### Current architecture (multiple slices)

This app registers **many** RTK Query APIs in [`src/store/index.ts`](src/store/index.ts): e.g. `authApi`, `siteApi`, `kotlinHouseApi`, `accountsApi`, `pythonBaseApi`, etc. Each feature file typically calls **`createApi({ reducerPath, baseQuery, endpoints })`** with [`baseQueryWithAuthGuard`](src/service/httpClient/baseQuery.ts) (or variant).

**[`src/service/python/baseApi.ts`](src/service/python/baseApi.ts)** exports **`pythonBaseApi`** with empty `endpoints: () => ({})`. **`injectEndpoints`** is used here for features that extend that slice (e.g. [`walletBillingApi.ts`](src/service/python/walletBillingApi.ts) imports `pythonBaseApi.injectEndpoints`). **Most other domains use their own `createApi` instance** — this is intentional legacy layout until consolidation.

### Paginated list responses

When the backend returns paginated envelopes, types should use **`data.items`** (or the array field your API actually returns). **`DataTable`** must receive an **array**:

- Prefer **`response?.data?.items ?? []`** when `data` is `{ items, total, page, … }`.
- Kotlin/Python wrappers in this repo often expose the list as **`response.data`** as a **direct array** (e.g. resources, houses, rooms). Always match the **declared response type** in `models/response`.

---

## HTTP client & auth

- **[`src/service/httpClient/baseQuery.ts`](src/service/httpClient/baseQuery.ts)** — `fetchBaseQuery` used by most Python APIs; **`prepareHeaders`** sets **`Authorization`** from **`state.auth.token`**. The **`baseUrl`** is currently **hardcoded** in this file (operational env alignment is a [migration target](#migration-targets)).
- **[`src/service/httpClient/baseQueryKotlin.ts`](src/service/httpClient/baseQueryKotlin.ts)** — alternate base query for Kotlin services; compare env usage when touching auth or URLs.
- **[`src/store/authSlice.ts`](src/store/authSlice.ts)** — token lives on **`auth.token`**, not under `user`.

---

## Models (`src/models`)

- **`models/request/*`** — request bodies and params.
- **`models/response/*`** — envelopes and DTOs (e.g. [`AccountMembersListResponse`](src/models/response/accountResponse.ts) with `data: AccountMemberResponse[]`).
- Align list types with real JSON; do not assume `data` is an array without checking the type.

---

## Validation / Yup schemas (`src/utilities/schema`)

- **`src/utilities/schema/`** — Yup objects exported as named schemas (e.g. [`authSchema.ts`](src/utilities/schema/authSchema.ts)).
- **`src/utilities/schema/index.ts`** — shared pieces where applicable.
- Wire into **Formik** with `validationSchema={…}` on `useFormik`.
- There is **no** `src/utils/schema` in this repo — use **`utilities/schema`**.

---

## Tables (`DataTable` + columns)

### Component

- **[`src/components/shared/datatable.tsx`](src/components/shared/datatable.tsx)** exports **`DataTable`** and types **`ColumnDef<T>`**, **`ActionItem<T>`**, etc.
- **Do not import** removed typo path `datatabless` — ESLint forbids it.
- Pass **`data` as an array** (or rely on `?? []`). For paginated APIs with `items`, use **`data={res?.data?.items ?? []}`** when applicable.

### Column definitions

- Shared column arrays often live in [`src/utilities/constants/colums.tsx`](src/utilities/constants/colums.tsx) (filename typo preserved for legacy imports).
- **[`src/components/shared/table.tsx`](src/components/shared/table.tsx)** defines **`ColumnDef`** for **`EditableDataTable`** — different from `DataTable` in `datatable.tsx`. Prefer **`ColumnDef` from `datatable.tsx`** when using **`DataTable`**; avoid mixing types unless shapes are compatible.

### Row actions

Pass **`actions`** as `ActionItem<T>[]` per the `DataTable` API.

### Row data sources (audit)

These `data=` bindings were checked against `models/response` (or local shapes): Kotlin **`resourceResponse.data`**, **`houseResponse.data`**, **`roomResponse.data`** are **arrays**; Python **`AccountMembersListResponse.data`** is an **array**; billing **`getQueryMonthlyBillResponse.data.bills`** is the **table array**; server sites uses a **filtered `accounts` list**; security/cost/route/ecr tables use **config or memoized arrays**. No change required for incorrect `items` vs bare `data` at the time of the audit.

---

## Button

**File:** [`src/components/ui/button.tsx`](src/components/ui/button.tsx)

Use **`prefixIcon`** / **`suffixIcon`** for icons (not icon-only children) when you need consistent spacing and loading behaviour. **`loading`** shows a spinner and disables the control.

---

## Input

**File:** [`src/components/ui/input.tsx`](src/components/ui/input.tsx)

Formik-oriented: pass **`name`**, optional **`formik`**, **`label`**, **`prefixIcon`** / **`suffixIcon`**.

---

## Select (`SelectField`)

**File:** [`src/components/shared/selectfield.tsx`](src/components/shared/selectfield.tsx)  
**Export:** **`SelectField`**. Legacy variants **`SelectField2`**, **`SelectField3`** exist — prefer **`SelectField`** for new work when possible.

---

## Modals (Nice Modal + legacy ModalProvider)

### Nice Modal (preferred for new flows)

1. Implement with **`NiceModal.create`** or pattern in existing modals.
2. Register ids in [`src/components/shared/modal/register.ts`](src/components/shared/modal/register.ts).
3. Open with **`NiceModal.show(ModalConstant.…)`**.

### Legacy ModalProvider

[`src/components/shared/modal.tsx`](src/components/shared/modal.tsx) exports **`useModal`** with **`openModal` / `closeModal`** — still used on some pages alongside Nice Modal. Prefer Nice Modal + `register.ts` for new features.

---

## Forms, toast, errors

- **Formik** for forms; **Yup** from **`utilities/schema`**.
- **toast** from **react-toastify** (container via shared toast wrapper where used).
- RTK **`unwrap()`** failures: use **`ErrorHandler.extractMessage(error)`** from [`@/service/httpClient/errorHandler`](src/service/httpClient/errorHandler.ts) in `catch` blocks.

---

## Dashboard navigation

- Paths: [`src/router/routes.tsx`](src/router/routes.tsx) (`RouteConstant`).
- Route trees: [`src/router/route-config.tsx`](src/router/route-config.tsx).
- Router: [`src/router/route-renderer.tsx`](src/router/route-renderer.tsx).
- Authenticated shell: [`src/components/layouts/DashboardLayoutRouter.tsx`](src/components/layouts/DashboardLayoutRouter.tsx).

---

## Lint & format

- **`pnpm lint`** — ESLint (includes **`no-restricted-imports`** blocking `datatabless`).
- **`pnpm build`** — `tsc -b` + Vite production build.

Imports: prefer **`@/…`** alias consistent with neighbouring files.

If **`pnpm lint`** reports errors unrelated to your change, fix them in a dedicated cleanup or adjust ESLint scope — do not revert the `datatabless` ban.

---

## Common gotchas

1. **Paginated envelopes** — If the API returns `{ items, total, … }`, use **`data.items`**, not the whole `data` object, for table rows.
2. **`DataTable` `data` prop** — Must be an **array**. Passing a non-array object yields empty or broken rows.
3. **Auth token** — **`state.auth.token`**, not nested under `user`.
4. **Multiple RTK slices** — Middleware and reducers must stay in sync in [`store/index.ts`](src/store/index.ts) when adding a new API file.
5. **Known typos in filenames** — e.g. `cloudServericesApi.ts`, `colums.tsx`; rename only when batch-updating imports.

---

## Migration targets

Improvements to schedule as separate efforts (not yet global conventions):

1. **HTTP / env** — Move hardcoded `baseUrl` in `baseQuery.ts` to **`import.meta.env.VITE_*`** and document required vars.
2. **RTK consolidation** — Reduce multiple `createApi` slices toward **`pythonBaseApi.injectEndpoints`** (and/or one Kotlin slice) with shared `tagTypes`.
3. **Modals** — Migrate **`ModalProvider`** call sites to **Nice Modal** + `register.ts` where feasible.
4. **Forms** — Standardize error handling with **`ErrorHandler.extractMessage`** across mutations.
5. **UI** — Replace **`SelectField2` / `3`** with **`SelectField`** when touching screens; use **`Button`** `prefixIcon` / `suffixIcon` consistently.
6. **Naming** — Optional rename `utilities` → `utils` and fix legacy filename typos in bulk PRs.

**Chosen phased order (implement one PR at a time):** (1) HTTP / env base URLs, (2) RTK consolidation, (3) modal unification toward Nice Modal, (4) forms/error standardization, (5) UI primitive cleanup (`SelectField`, `Button` icons).

---

## When this doc drifts

Update this file when you introduce a **new cross-cutting pattern** (e.g. a new HTTP client or replacement for `DataTable`).
