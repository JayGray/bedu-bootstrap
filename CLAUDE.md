# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Tech Stack

- **Runtime:** Bun (not Node.js)
- **Backend:** ElysiaJS (type-safe web framework)
- **Frontend:** React 18+ with TypeScript
- **Database:** DrizzleORM + SQLite (bun:sqlite)
- **Styling:** UnoCSS (atomic CSS)

## Commands

### Development
- `bun dev` - Start dev server with hot reloading (runs CSS watcher + server concurrently)
- `bun --hot src/index.ts` - Start server only with hot reload

### Database
- `bun run db:push` - Push schema changes to database (for development)
- `bun run db:studio` - Open Drizzle Studio at http://local.drizzle.studio
- `bun run db:generate` - Generate migration files
- `bun run db:migrate` - Run migrations

### Production
- `bun start` - Start production server (NODE_ENV=production)

### Utilities
- `bun run clean` - Remove dist/ directory

## Architecture

### Server (src/index.ts)
Uses ElysiaJS, not express or Bun.serve directly. Routes are defined with ElysiaJS syntax:

```ts
app.get('/path', handler)
   .post('/path', handler)
   .listen(3000)
```

The server serves both the HTML template and API routes. Use `Bun.file()` to serve static HTML.

### API Routes (src/api/)
API handlers receive ElysiaJS `Context`. Extract body with `ctx.body`:

```ts
export const handler = async (ctx: Context) => {
    const body = ctx.body as { field: string };
    // use body...
}
```

Database operations use DrizzleORM imported from `@/db`.

### Database (src/db/)
- `schema.ts` - Define tables using drizzle-orm/sqlite-core
- `index.ts` - Exports configured `db` instance using bun:sqlite

Always use DrizzleORM query builder, never raw SQL. Schema changes require `bun run db:push`.

### Frontend (src/client.tsx, src/ui/)
React app entry is `client.tsx`. It mounts to `#root` in `index.html`.

The HTML template uses `<script type="module" src="./client.tsx">` - Bun handles transpilation automatically.

### Styling (UnoCSS)
CSS is generated to `dist/index.css` and watched in dev mode. Use Tailwind-style utilities in className. Icons available via `@iconify-json/lucide`.

### Path Aliases
`@/*` resolves to `./src/*` (configured in tsconfig.json). Always use path aliases for imports within src/.

## Development Workflow

1. Schema changes → edit `src/db/schema.ts` → `bun run db:push`
2. New API routes → add to `src/api/` → register in `src/index.ts`
3. UI changes → edit components in `src/ui/` → hot reload automatic
4. CSS changes → use UnoCSS utilities → watcher regenerates automatically

## Bun-Specific Notes

- Use `bun:sqlite` not better-sqlite3
- Use `Bun.file()` not fs.readFile
- .env loads automatically (no dotenv needed)
- Use `bun test` not jest/vitest
- ElysiaJS is optimized for Bun runtime

## Important Patterns

### Adding Database Tables
1. Define in `src/db/schema.ts`
2. Export type: `export type TableName = InferSelectModel<typeof tableName>`
3. Run `bun run db:push`
4. Import from `@/db/schema` in API handlers

### Creating API Endpoints
1. Create handler in `src/api/`
2. Import db from `@/db`
3. Use async/await with DrizzleORM
4. Register route in `src/index.ts` with ElysiaJS

### React + TypeScript
- Use functional components with hooks
- Define interfaces for props and API responses
- Use `@/` path alias for imports
- Import UnoCSS reset: `import '@unocss/reset/tailwind.css'`
