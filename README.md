# Nuxt + Drizzle SPA PoC

A proof-of-concept Nuxt Single Page Application (SPA) demonstrating integration with Drizzle ORM and PGLite for client-side caching.

## Architecture Overview

This project implements a hybrid data architecture:

- **Backend**: Nuxt API routes (`server/api/`) using Drizzle ORM to communicate with a remote Postgres database
- **Frontend**: Nuxt SPA with client-side PGLite database for caching "today's data" in IndexedDB
- **Data Sync**: Model `save()` methods persist to Postgres first via HTTP proxy, then sync to PGLite only after successful remote save

## Getting Started

### Prerequisites

- **Node.js**: v24 (use `.nvmrc` file)
- **Package Manager**: pnpm
- **Browser**: Modern browser with IndexedDB support

### Setup

1. **Install Node.js version 24** (if using nvm):
   ```bash
   nvm use
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Start the development server**:
   ```bash
   pnpm dev
   ```

4. **Open your browser**:
   Navigate to `http://localhost:3000` (or the port shown in the terminal)

## Environment Variables

Environment variables for database connections should be configured in `.env` (to be created during implementation):

- Database connection details for Drizzle ORM
- Any API keys or secrets required for backend operations

**Note**: Never commit sensitive credentials to version control. Use `.env` files (which should be in `.gitignore`) or secure environment variable management.

## Implementation Tasks

See `agent/TASKS.md` for the step-by-step implementation plan. Tasks are designed to be atomic and executed sequentially.

## Development Workflow

1. Follow tasks in `agent/TASKS.md` sequentially
2. Each task should be completed on its own branch
3. Verify acceptance criteria before committing
4. Wait for PR approval before proceeding to the next task

## Key Technologies

- **Nuxt 3**: Vue.js framework for SPA development
- **Drizzle ORM**: TypeScript ORM for Postgres
- **PGLite**: Client-side Postgres-compatible database
- **IndexedDB**: Browser storage backend for PGLite

## Security

- All security scans are performed using Snyk (see `.cursor/rules/snyk_rules.mdc`)
- Database credentials must never be embedded in client-side code
- All database operations go through the HTTP proxy in `server/api/`

