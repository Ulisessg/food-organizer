import { type AppDispatch, wrapper } from 'redux/store'
import { type FC, type ReactNode, useEffect } from 'react'
import { Provider as ReduxProvider, useDispatch } from 'react-redux'
import type { AppProps } from 'next/app'
import { GlobalStyles } from 'd-system'
import Header from 'components/Header'
import { getFoodsDataThunk } from 'redux/slices/foodSlice'
import { getIngredientsThunk } from 'redux/slices/ingredientsSlice'
import { getMenusDataThunk } from 'redux/slices/menusSlice'
import { getPurchasePlacesThunk } from 'redux/slices/purchasePlacesSlice'
import { getUomDataThunk } from 'redux/slices/unitsOfMeasureSlice'

export default function MyApp ({ Component, ...pageProps }: AppProps): JSX.Element {
  const { store } = wrapper.useWrappedStore(pageProps)
  return (
    <ReduxProvider store={store}>
      <ReduxProviderWrapper>
        <Component {...pageProps} />
      </ReduxProviderWrapper>
    </ReduxProvider>
  )
}

const ReduxProviderWrapper: FC<{
  children: ReactNode
}> = ({ children }) => {
  const dispatch: AppDispatch = useDispatch()
  useEffect(
    () => {
      // eslint-disable-next-line lines-around-comment
      /*
       * Get data, todo: create a limiter or develop a performance improvement
       */
      // Ingredients
      void dispatch(getIngredientsThunk(null))
      void dispatch(getPurchasePlacesThunk(null))
      void dispatch(getUomDataThunk(null))
      void dispatch(getFoodsDataThunk(null))
      void dispatch(getMenusDataThunk(null))
    },
    [dispatch]
  )
  return <>
  <GlobalStyles footer header={<Header />}>
    {children}
  </GlobalStyles>
</>
}
