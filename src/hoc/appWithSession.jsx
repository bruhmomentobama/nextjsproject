import { SessionProvider } from 'next-auth/react'

export default function appWithSession(Component) {
  return (props) => (
    <SessionProvider session={props?.pageProps?.session}>
      <Component {...props} />
    </SessionProvider>
  )
}
