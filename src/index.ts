import { Elysia } from 'elysia';
import { html } from '@elysiajs/html';
import { getUsers, createUser } from '@/api/users';

const app = new Elysia()
    .use(html())
    .get('/', () => Bun.file('./src/index.html'))
    .get('/api/health', () => ({ status: 'ok', timestamp: new Date().toISOString() }))
    .get('/api/users', getUsers)
    .post('/api/users', createUser)
    .listen(3000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
