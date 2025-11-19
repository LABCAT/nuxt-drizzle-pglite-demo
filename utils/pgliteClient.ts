import { PGlite } from '@electric-sql/pglite'

// Initialize PGLite with IndexedDB persistence
export const pglite = new PGlite('idb://nuxt-drizzle-cache')
