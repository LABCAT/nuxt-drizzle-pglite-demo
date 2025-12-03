import { drizzle } from 'drizzle-orm/pg-proxy'

// Client-side Drizzle instance using HTTP proxy
// This sends queries to the server-side proxy endpoint
export const db = drizzle(async (sql, params, method) => {
  try {
    const rows = await $fetch<any[][] | any[]>('/api/drizzle', {
      method: 'POST',
      body: { sql, params, method }
    })

    return { rows }
  } catch (error: any) {
    console.error('Error from pg proxy server:', error)
    throw error
  }
})

