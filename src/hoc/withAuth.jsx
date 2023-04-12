import { useSession } from 'next-auth/react'

export default function withAuth(Component) {
  return (props) => {
    const { status } = useSession({
      required: true,
      unauthorized: '/api/auth/signin'
    })

    if (status === 'loading') return <div>Loading...</div>

    return (
      <Component {...props} />
    )
  }
}
