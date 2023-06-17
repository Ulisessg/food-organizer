import { type AppDispatch, store } from 'redux/store'
import { type FC, type ReactNode, useEffect } from 'react'
import { Provider as ReduxProvider, useDispatch } from 'react-redux'
import { getDaysThunk, getWeeklyMenusThunk } from 'redux/slices/weekSlice'
import { getMenusDataThunk, getMenusIngredientsThunk } from 'redux/slices/menusSlice'
import type { AppProps } from 'next/app'
import { GlobalStyles } from 'd-system'
import Header from 'components/web/Header'
import dayjs from 'dayjs'
import dayjsCustomParseFormat from 'dayjs/plugin/customParseFormat'
import dayjsWeekDayPlugin from 'dayjs/plugin/weekday'
import { getFoodsDataThunk } from 'redux/slices/foodSlice'
import { getIngredientsThunk } from 'redux/slices/ingredientsSlice'
import { getPurchasePlacesThunk } from 'redux/slices/purchasePlacesSlice'
import { getUomDataThunk } from 'redux/slices/unitsOfMeasureSlice/thunks'

// eslint-disable-next-line sort-imports
import 'styles/pages/GlobalStyles.css'
dayjs.extend(dayjsCustomParseFormat)
dayjs.extend(dayjsWeekDayPlugin)
dayjs.locale('es')

export default function MyApp ({ Component, ...pageProps }: AppProps): JSX.Element {
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
      void dispatch(getIngredientsThunk(null))
      void dispatch(getPurchasePlacesThunk(null))
      void dispatch(getUomDataThunk(null))
      void dispatch(getFoodsDataThunk(null))
      void dispatch(getMenusDataThunk(null))
      void dispatch(getDaysThunk())
      void dispatch(getWeeklyMenusThunk())
      void dispatch(getMenusIngredientsThunk(null))
    },
    [dispatch]
  )
  return <>
  <GlobalStyles footer header={<Header />}>
    {children}
  </GlobalStyles>
</>
}
