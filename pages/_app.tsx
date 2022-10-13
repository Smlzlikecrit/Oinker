import type { AppProps } from 'next/app'
import { Development } from '../environments/containers/Development'

const App = ({ Component, pageProps }: AppProps)  => {
  return (
  <Development>
    <Component {...pageProps} />
  </Development>
  )
}

export default App
