<template>
  <div style="min-height: 100vh; font-family: system-ui, sans-serif;">
    <div style="padding: 2rem; max-width: 960px; margin: 0 auto;">
      <h1>Stocks Live Demo</h1>

      <p v-if="loading" style="margin-bottom: 1rem;">Preparing the local PGlite table...</p>

      <div style="margin-bottom: 1rem; display: flex; gap: 0.5rem; flex-wrap: wrap;">
        <button
          :disabled="!clientReady || inserting || manualLoading"
          @click="insertRandomStock"
          style="padding: 0.75rem 1.25rem;"
        >
          {{ inserting ? 'Inserting…' : 'Insert random stock' }}
        </button>
        <button
          :disabled="!clientReady || manualLoading"
          @click="runQuery"
          style="padding: 0.75rem 1.25rem;"
        >
        {{ manualLoading ? 'Running query…' : 'Run Remote Query' }}
        </button>
      </div>

      <pre
        v-if="manualError"
        style="background: #fee; padding: 1rem; border-radius: 4px; color: #c00; margin-bottom: 1rem;"
      >
        {{ manualError }}
      </pre>
      <pre
        v-if="manualResult && false"
        style="background: #f5f5f5; padding: 1rem; border-radius: 4px; overflow-x: auto; margin-bottom: 1rem;"
      >
        {{ JSON.stringify(manualResult, null, 2) }}
      </pre>

      <StocksTable v-if="clientReady" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { providePGlite } from '@electric-sql/pglite-vue'
import StocksTable from '~/components/StocksTable.vue'

const loading = ref(true)
const clientReady = ref(false)
const inserting = ref(false)
const manualLoading = ref(false)
const manualResult = ref<any>(null)
const manualError = ref<string | null>(null)

const markets = ['GLOBAL', 'ASX', 'NZX'] as const
const statuses = ['watch', 'prepare-buy', 'prepare-sell', 'hold'] as const

const pgliteClient = await getPGliteClient()
providePGlite(pgliteClient)

// Initialize the table
try {
  for (const statement of stocksInitStatements) {
    await pgliteClient.query(statement)
  }
} catch (error) {
  console.error('Failed to initialize stocks table:', error)
}

loading.value = false
clientReady.value = true

/**
 * Fetch the latest stocks directly from the remote Postgres database via the HTTP proxy.
 */
const runQuery = async () => {
  manualLoading.value = true
  manualError.value = null
  manualResult.value = null

  try {
    const remoteStocks = await db.select().from(stocks).orderBy(stocks.sortOrder, stocks.ticker)
    const stocksWithoutIds = remoteStocks.map(({ id, ...rest }) => rest)
    
    // Insert first 10 rows into PGLite using Drizzle (without IDs to avoid conflicts)
    const pgliteDb = getPGliteDb()
    const first10 = stocksWithoutIds.slice(0, 10)
    
    if (first10.length > 0) {
      await pgliteDb.insert(stocks).values(first10)
    }
    
    manualResult.value = stocksWithoutIds
  } catch (e: any) {
    manualError.value = e?.message || 'Manual query failed'
  } finally {
    manualLoading.value = false
  }
}

// Auto-run query on startup
runQuery()

/**
 * Insert a random stock from manualResult into PGLite.
 */
const insertRandomStock = async () => {
  inserting.value = true

  if (!manualResult.value || manualResult.value.length === 0) {
    inserting.value = false
    return
  }

  const pgliteDb = getPGliteDb()
  const randomStock = manualResult.value[Math.floor(Math.random() * manualResult.value.length)]

  await pgliteDb.insert(stocks).values(randomStock)

  inserting.value = false
}
</script>
