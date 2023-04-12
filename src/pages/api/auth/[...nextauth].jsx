import NextAuth from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'

import prisma from '@/controllers/_helpers/prisma'

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
  ],
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id // eslint-disable-line
      return session
    }
  }
}

export default NextAuth(authOptions)
