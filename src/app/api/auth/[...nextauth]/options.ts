import type { NextAuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import PostgresAdapter from "@auth/pg-adapter";
import { Pool } from 'pg';
import type { Adapter } from 'next-auth/adapters';

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL + '?sslmode=require',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

// about OAuth generally  https://www.youtube.com/watch?v=w2h54xz6Ndw

export const options: NextAuthOptions = {
  adapter: PostgresAdapter(pool) as Adapter,
  session: {
    strategy: 'jwt',
  },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    // https://www.youtube.com/watch?v=ot9yuKg15iA
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    })
  ],
}
