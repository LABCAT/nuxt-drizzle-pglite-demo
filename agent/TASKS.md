# Cursor Agent Tasks for Nuxt Drizzle SPA PoC

## Task 1: Create Nuxt SPA scaffold

- Run: pnpm create nuxt-app nuxt-drizzle-demo --app-type spa --package-manager pnpm
- Verify nuxt-drizzle-demo/package.json exists
- Run: pnpm dev
- Acceptance: Nuxt dev starts without errors

## Task 2: Add Drizzle HTTP proxy route

- Create: nuxt-drizzle-demo/server/api/drizzle.ts
- Add minimal Drizzle HTTP proxy scaffold
- Verify: node nuxt-drizzle-demo/server/api/drizzle.ts runs without errors
- Acceptance: File exists and executes

## Task 3: Add PGLite client scaffold with IndexedDB persistence

- Install: pnpm add @electric-sql/pglite
- Create: nuxt-drizzle-demo/utils/pgliteClient.ts
- Add minimal init code using IndexedDB for browser storage (e.g., `new PGlite('idb://nuxt-drizzle-cache')`)
- Verify: module imports and initializes without errors
- Verify: IndexedDB database 'nuxt-drizzle-cache' is created in browser DevTools
- Acceptance: pgliteClient.ts exists, works, and persists data to IndexedDB

## Task 4: Add base Model class with save() stub

- Create: nuxt-drizzle-demo/models/Model.ts
- Add save() stub
- Verify: new Model().save() prints 'stub save called'
- Acceptance: Model class exists and save() callable
