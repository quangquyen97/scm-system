import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import '../components/login/button.modules.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
