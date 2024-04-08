import type { NextAuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import PostgresAdapter from "@auth/pg-adapter";
import { Pool } from 'pg'

const pool = new Pool({
  host: 'localhost',
  user: 'database-user',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

// about OAuth generally  https://www.youtube.com/watch?v=w2h54xz6Ndw

export const options: NextAuthOptions = {
  adapter: PostgresAdapter(pool),
  session: {
    strategy: 'database',
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
  //logs are in the terminal ; https://authjs.dev/guides/basics/callbacks
  // callbacks: {
  //   async signIn({user}) {
  //     console.log(user)
  //     return true
  //   },
  // },
}
