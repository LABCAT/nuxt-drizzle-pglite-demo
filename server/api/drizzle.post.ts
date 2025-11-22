import { Client } from 'pg'

type ProxyPayload = {
  sql: string
  params?: unknown[]
  method: 'all' | 'run' | 'values' | 'get'
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const remoteUrl = config.remoteDatabaseUrl?.trim()

  const client = new Client({
    connectionString: remoteUrl!,
    ssl: { rejectUnauthorized: false },
  })

  await client.connect()

  const body = await readBody<Partial<ProxyPayload>>(event).catch(
    () => ({} as Partial<ProxyPayload>),
  )

  const { sql, params, method } = body
  const sqlBody = sql!.replace(/;/g, '')

  try {
    const result = await client.query({
      text: sqlBody,
      values: params,
      rowMode: method === 'all' ? 'array' : undefined,
    })
    return result.rows
  } catch (e: any) {
    throw createError({
      statusCode: 500,
      message: e?.message || 'Database operation failed',
      data: e,
    })
  } finally {
    await client.end()
  }
})
