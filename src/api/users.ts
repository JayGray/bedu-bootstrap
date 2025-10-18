import { db } from '@/db';
import { users } from '@/db/schema';
import type { Context } from 'elysia';

export const getUsers = async () => {
    const allUsers = await db.select().from(users);
    return allUsers;
};

export const createUser = async (ctx: Context) => {
    const body = ctx.body as { name: string; email: string };

    const [newUser] = await db
        .insert(users)
        .values({
            name: body.name,
            email: body.email
        })
        .returning();

    return newUser;
};
