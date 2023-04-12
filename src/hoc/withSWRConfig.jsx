import { SWRConfig } from 'swr'

export default function withSWRConfig(Component) {
  return ({ fallback, ...props }) => (
    <SWRConfig value={{ fallback }}>
      <Component {...props} />
    </SWRConfig>
  )
}
