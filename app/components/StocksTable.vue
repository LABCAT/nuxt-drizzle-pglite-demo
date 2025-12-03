<template>
  <table style="width: 100%; border-collapse: collapse;">
    <thead>
      <tr>
        <th style="text-align: left; border-bottom: 2px solid #ccc; padding: 0.5rem;">Ticker</th>
        <th style="text-align: left; border-bottom: 2px solid #ccc; padding: 0.5rem;">Name</th>
        <th style="text-align: left; border-bottom: 2px solid #ccc; padding: 0.5rem;">Market</th>
        <th style="text-align: left; border-bottom: 2px solid #ccc; padding: 0.5rem;">Status</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="stock in liveStocks"
        :key="stock.id"
        style="border-bottom: 1px solid #eee;"
      >
        <td style="padding: 0.5rem;">{{ stock.ticker }}</td>
        <td style="padding: 0.5rem;">{{ stock.name }}</td>
        <td style="padding: 0.5rem;">{{ stock.market }}</td>
        <td style="padding: 0.5rem;">{{ stock.status }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { useLiveQuery } from '@electric-sql/pglite-vue'

const pgliteDb = getPGliteDb()

// Build query with Drizzle and convert to SQL
const query = pgliteDb.select().from(stocks).orderBy(stocks.ticker)
const { sql, params } = query.toSQL()

const liveStocksRaw = useLiveQuery<StockRow>(sql, params)

const liveStocks = computed(() => liveStocksRaw.rows.value ?? [])
</script>

