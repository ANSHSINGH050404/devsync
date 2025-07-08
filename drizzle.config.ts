import 'dotenv/config';
import type { Config } from 'drizzle-kit';

export default {
  schema: './app/drizzle/schema.ts',
  out: '.app//drizzle/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL ?? '', // ✅ FIXED HERE
  },
} satisfies Config;
