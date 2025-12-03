import { PGlite } from '@electric-sql/pglite'
import { live } from '@electric-sql/pglite/live'
import { drizzle } from 'drizzle-orm/pglite'

let pgliteInstance: any = null
let pgliteDb: any = null

export async function getPGliteClient() {
  if (!pgliteInstance) {
    pgliteInstance = await PGlite.create({
      dataDir: 'idb://nuxt-drizzle-cache',
      extensions: { live },
    })
    pgliteDb = drizzle(pgliteInstance)
  }
  return pgliteInstance
}

export function getPGliteDb() {
  return pgliteDb
}

