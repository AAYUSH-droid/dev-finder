import { pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('testing', {
  id: text('id').notNull().primaryKey(),
  name: text('name'),
});
