# Cursor Agent Tasks for Nuxt Drizzle SPA PoC

## Task 1: Create Nuxt SPA scaffold

- Run: pnpm create nuxt-app . --app-type spa --package-manager pnpm
- Verify package.json exists
- Run: pnpm dev
- Acceptance: Nuxt dev starts without errors

## Task 2: Add Drizzle HTTP proxy route

- Create: server/api/drizzle.ts
- Add minimal Drizzle HTTP proxy scaffold
- Verify: File exists at server/api/drizzle.ts
- Verify: TypeScript syntax is valid (check for linter errors)
- Acceptance: File exists with valid TypeScript syntax

## Task 3: Add PGLite client scaffold with IndexedDB persistence

- Run: pnpm add @electric-sql/pglite
- Create: utils/pgliteClient.ts
- Add minimal init code using IndexedDB for browser storage (e.g., `new PGlite('idb://nuxt-drizzle-cache')`)
- Verify: File exists at utils/pgliteClient.ts
- Verify: TypeScript syntax is valid (check for linter errors)
- Verify: @electric-sql/pglite is listed in package.json dependencies
- Acceptance: pgliteClient.ts exists with valid syntax and PGLite dependency installed

## Task 4: Add base Model class with save() stub

- Create: models/Model.ts
- Add save() stub
- Verify: File exists at models/Model.ts
- Verify: TypeScript syntax is valid (check for linter errors)
- Acceptance: Model class exists with valid syntax and save() method callable
