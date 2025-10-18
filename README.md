# bedu-bootstrap

A modern full-stack TypeScript template with Bun, ElysiaJS, React, and DrizzleORM.

## Features

- ⚡ **Bun** - Fast JavaScript runtime and package manager
- 🦊 **ElysiaJS** - Type-safe, high-performance web framework
- ⚛️ **React** - UI library with hooks and modern patterns
- 🗄️ **DrizzleORM** - Type-safe ORM with SQLite
- 🎨 **UnoCSS** - Instant on-demand atomic CSS engine
- 📘 **TypeScript** - Full type safety across the stack

## Quick Start

### Using bun create (Recommended)

```bash
bun create github.com/yourusername/bedu-bootstrap my-app
cd my-app
bun dev
```

### Manual Installation

```bash
git clone https://github.com/yourusername/bedu-bootstrap.git
cd bedu-bootstrap
bun install
bun dev
```

## Available Scripts

- `bun dev` - Start development server with hot reloading
- `bun start` - Start production server
- `bun run db:push` - Push database schema changes
- `bun run db:studio` - Open Drizzle Studio (database GUI)
- `bun run db:generate` - Generate migrations
- `bun run clean` - Clean build artifacts

## Project Structure

```
bedu-bootstrap/
├── src/
│   ├── index.ts          # ElysiaJS server entry point
│   ├── client.tsx        # React app entry point
│   ├── index.html        # HTML template
│   ├── api/              # API route handlers
│   │   └── users.ts      # Example user endpoints
│   ├── db/               # Database configuration
│   │   ├── index.ts      # Drizzle client
│   │   └── schema.ts     # Database schema
│   └── ui/               # React components
│       └── App.tsx       # Main app component
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── drizzle.config.ts     # Drizzle ORM configuration
├── uno.config.ts         # UnoCSS configuration
└── postinstall.ts        # Automatic setup script
```

## Development

The template includes a working example with:
- REST API endpoints (`/api/users`)
- Database schema with users table
- React UI with CRUD operations
- Path aliases (`@/*` for src imports)
- Hot module reloading

### Adding New Routes

Edit `src/index.ts` to add ElysiaJS routes:

```ts
app.get('/api/posts', () => {
    // Your handler
});
```

### Database Schema

Define your schema in `src/db/schema.ts`:

```ts
export const posts = sqliteTable('posts', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    title: text('title').notNull(),
    // ...
});
```

Then run `bun run db:push` to sync changes.

## Deployment

Build for production:

```bash
bun run start
```

The server runs on port 3000 by default.

## Tech Stack

- [Bun](https://bun.sh) - Runtime, package manager, bundler
- [ElysiaJS](https://elysiajs.com) - Web framework
- [React](https://react.dev) - UI library
- [DrizzleORM](https://orm.drizzle.team) - TypeScript ORM
- [UnoCSS](https://unocss.dev) - Atomic CSS engine
- [TypeScript](https://www.typescriptlang.org) - Type safety

## License

MIT
