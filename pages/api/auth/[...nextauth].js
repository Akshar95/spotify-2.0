import NextAuth from 'next-auth'
import SpotifyProvider from 'next-auth/providers/Spotify'
import spotifyApi, { LOGIN_URL } from '../../../lib/spotify'

async function refreshAccessToken(token) {
  try {
    spotifyApi.setAccessToken(token.accessToken)
    spotifyApi.setRefreshToken(token.refreshToken)

    const { body: refreshedToken } = await spotifyApi.refreshAccessToken()
    console.log('REFRESHED TOKEN IS', refreshedToken)

    //This value is returned if the access token has expired
    return {
      ...token,
      accessToken: refreshedToken.access_token,
      accessTokenExpires: Date.now + refreshedToken.expires_in * 1000, // 1 hour as 3600 returned from Spotify API
      refreshToken: refreshedToken.refresh_token ?? token.freshToken,
      //replace if new one comes back else fall back to old refresh token
    }
  } catch (error) {
    console.error(error)

    // if there are any errors returning the access token
    return {
      ...token,
      error: 'refreshAccessTokenError',
    }
  }
}

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
      authorization: LOGIN_URL,
    }),
    // ...add more providers here
  ],
  secret: process.env.JWT_SECRECT,
  pages: {
    signIn: '/login', 
    //connected our custom login
  },
  callbacks: {
    //the authentication part
    async jwt({ token, account, user }) {
      //Below are 3 scenarios when a user logs into this Spotify Clone

      // 1. initial sign in -
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpires: account.expires_at * 1000,
        }
      }
      // 2. when you return back to the app after some time you have already logged in
      // This checks if the access token has not expired. and if not it persists the logged in state
      //Return previous token if the access token has not expired yet
      if (Date.now() < token.accessTokenExpires) {
        console.log('EXISTING ACCESS TOKEN IS VALID')
        return token
      }

      // 3. Access token has expired, try to update it
      console.log('ACCESS TOKEN HAS EXPIRED, REFRESHING...')
      return await refreshAccessToken(token)
    },

    // connecting to what the client can see in their session, take what is needed from the token into the session
    async session({ session, token }) {
      session.user.accessToken = token.accessToken
      session.user.refreshToken = token.refreshToken
      session.user.username = token.username

      return session
    },
  },
})
