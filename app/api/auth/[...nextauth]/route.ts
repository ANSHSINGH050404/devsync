import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db } from '@/lib/db';
// import { db } from '@/app/drizzle/schema.ts';

const handler = NextAuth({
  adapter: DrizzleAdapter(db), // schema argument removed
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: 'database',
  },
callbacks: {
  async session({ session, user }) {
    if (session.user && user?.id) {
      session.user.email = user.id;
    }
    return session;
  },
},

});

export { handler as GET, handler as POST };
