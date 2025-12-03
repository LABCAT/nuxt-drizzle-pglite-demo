// schema/stocks.ts
import { pgTable, uuid, varchar, integer, text, timestamp, pgEnum } from "drizzle-orm/pg-core";

// Enums
export const market = pgEnum("market", ['GLOBAL', 'ASX', 'NZX']);
export const status = pgEnum("status", ['watch', 'prepare-buy', 'prepare-sell', 'hold']);

// Drizzle schema
export const stocks = pgTable("stocks", {
  id: uuid().defaultRandom().primaryKey().notNull(),
  ticker: varchar({ length: 10 }).notNull(),
  name: varchar({ length: 255 }).notNull(),
  market: market().notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
  status: status().default('watch').notNull(),
  yahooUrl: text("yahoo_url"),
  createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
});

// SQL for PGlite initialization
export const stocksInitStatements = [
  `DROP TABLE IF EXISTS stocks CASCADE`,
  `DROP TYPE IF EXISTS status`,
  `DROP TYPE IF EXISTS market`,
  `CREATE TYPE market AS ENUM ('GLOBAL', 'ASX', 'NZX')`,
  `CREATE TYPE status AS ENUM ('watch', 'prepare-buy', 'prepare-sell', 'hold')`,
  `
  CREATE TABLE stocks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ticker VARCHAR(10) NOT NULL,
    name VARCHAR(255) NOT NULL,
    market market NOT NULL,
    sort_order INTEGER DEFAULT 0 NOT NULL,
    status status DEFAULT 'watch' NOT NULL,
    yahoo_url TEXT,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW() NOT NULL
  )
  `,
]

// Infer types
type StockRow = typeof stocks.$inferSelect;
type StockInsert = typeof stocks.$inferInsert;

// Stock class
export class Stock {
  constructor(row: StockRow) {
    Object.assign(this, row);
  }

  // Computed properties
  get displayName() {
    return `${this.ticker} - ${this.name}`;
  }

  get marketLabel() {
    return {
      GLOBAL: 'Global',
      ASX: 'Australian Securities Exchange',
      NZX: 'New Zealand Exchange',
    }[this.market as string] || this.market;
  }

  get statusLabel() {
    return {
      watch: 'Watching',
      'prepare-buy': 'Prepare to Buy',
      'prepare-sell': 'Prepare to Sell',
      hold: 'Holding',
    }[this.status as string] || this.status;
  }

  get statusColor() {
    return {
      watch: 'gray',
      'prepare-buy': 'green',
      'prepare-sell': 'orange',
      hold: 'blue',
    }[this.status as string];
  }

  // Business logic
  isActionable() {
    return this.status === 'prepare-buy' || this.status === 'prepare-sell';
  }

  canBuy() {
    return this.status === 'watch' || this.status === 'prepare-buy';
  }

  canSell() {
    return this.status === 'hold' || this.status === 'prepare-sell';
  }

  hasYahooUrl() {
    return !!this.yahooUrl;
  }

  // Display helpers
  toJSON() {
    return {
      id: this.id,
      ticker: this.ticker,
      name: this.name,
      displayName: this.displayName,
      market: this.market,
      status: this.status,
      statusLabel: this.statusLabel,
    };
  }
}

// Merge interface for TypeScript
export interface Stock extends StockRow {}

export type { StockRow, StockInsert };