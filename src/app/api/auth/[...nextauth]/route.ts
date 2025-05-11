import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

/**
 * NextAuth configuration handler for authentication
 * Sets up Google OAuth provider and defines authentication callbacks
 * @see https://next-auth.js.org/configuration/options
 */
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || 'dummy-client-id',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'dummy-client-secret',
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
  },
  callbacks: {
    /**
     * Callback that is executed whenever a session is checked
     * @param {Object} params - Session check parameters
     * @param {Object} params.session - Current session object
     * @returns {Promise<Session>} Modified session object
     */
    async session({ session }) {
      return session;
    },
  },
});

export { handler as GET, handler as POST };