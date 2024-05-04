// without a defined matcher, this one line applies next-auth to the entire project
import { withAuth } from 'next-auth/middleware'

export default withAuth(
  /**
   * @see https://next-auth.js.org/configuration/nextjs#caveats
   */
  function middleware (req) {
    // JWT token
    console.log('req.nextauth: ', req.nextauth)
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        return Boolean(token)
      },
    },
  })

export const config = { matcher: ['/admin', '/profile'] }
