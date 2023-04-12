import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/pages/api/auth/[...nextauth]'

const authenticateUser = async (req, res, next) => {
  const session = await getServerSession(req, res, authOptions)

  if (!session) return res.status(401).json({ message: 'Please Log In First!' })
  return next()
}

export default authenticateUser
