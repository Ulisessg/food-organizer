import type { AppProps } from 'next/app'
import { GlobalStyles } from 'd-system'
import Header from 'components/Header'

export default function MyApp ({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <GlobalStyles footer header={<Header />}>
        <Component {...pageProps} />
      </GlobalStyles>
    </>
  )
}
