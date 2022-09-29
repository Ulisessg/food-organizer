import type { AppProps } from 'next/app'
import { GlobalStyles } from 'd-system'

export default function MyApp ({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <GlobalStyles footer>
        <Component {...pageProps} />
      </GlobalStyles>
    </>
  )
}
