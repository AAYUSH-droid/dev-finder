import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from './schema';
import postgres from 'postgres';

// for query purposes
const queryClient = postgres(process.env.DATABASE_URL!, { prepare: false });
const db = drizzle(queryClient, { schema });

export { db };
