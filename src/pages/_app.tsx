import type { AppProps } from 'next/app'
import { GlobalStyles } from 'd-system'
import Header from 'components/Header'
import { Provider as ReduxProvider } from 'react-redux'
import { wrapper } from 'redux/store'

export default function MyApp ({ Component, ...pageProps }: AppProps): JSX.Element {
  const { store } = wrapper.useWrappedStore(pageProps)
  return (
    <ReduxProvider store={store}>
      <GlobalStyles footer header={<Header />}>
        <Component {...pageProps} />
      </GlobalStyles>
    </ReduxProvider>
  )
}
