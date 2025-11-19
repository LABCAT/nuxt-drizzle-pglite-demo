import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

// Database connection string from environment variables
// Format: postgresql://user:password@host:port/database
const connectionString = process.env.DATABASE_URL || ''

if (!connectionString) {
  console.warn('DATABASE_URL environment variable is not set. Database operations will fail.')
}

// Create postgres client (connection pool)
const client = postgres(connectionString)

// Create Drizzle instance
export const db = drizzle(client)
