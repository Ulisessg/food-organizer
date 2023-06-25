import { type AppDispatch, store } from 'redux/store'
import { type FC, type ReactNode, useEffect } from 'react'
import { Provider as ReduxProvider, useDispatch } from 'react-redux'
import { getDaysThunk, getWeeklyMenusThunk } from 'redux/slices/weeklyMenusSlice/thunks'
import { getMenusDataThunk, getMenusIngredientsThunk } from 'redux/slices/menusSlice/thunks'
import type { AppProps } from 'next/app'
import { GlobalStyles } from 'd-system'
import Header from 'components/web/Header'
import dayjs from 'dayjs'
import dayjsCustomParseFormat from 'dayjs/plugin/customParseFormat'
import dayjsWeekDayPlugin from 'dayjs/plugin/weekday'
import
getDaysElectronCallback
  from 'redux/slices/weeklyMenusSlice/callbacks/electron/getDaysElectronCallback'
import
getFoodsDataElectronCallback
  from 'redux/slices/foodsSlice/callbacks/electron/getFoodsDataElectronCallback'
import { getFoodsDataThunk } from 'redux/slices/foodsSlice/thunks'
import
getIngredientsDataElectronCallback
  from 'redux/slices/ingredientsSlice/callbacks/electron/getIngredientsDataElectronCallback'
import { getIngredientsThunk } from 'redux/slices/ingredientsSlice/thunks'
import { getPurchasePlacesThunk } from 'redux/slices/purchasePlacesSlice/thunks'
import
getUomDataElectronCallback
  from 'redux/slices/unitsOfMeasureSlice/callbacks/electron/getUomDataElectronCallback'
import { getUomDataThunk } from 'redux/slices/unitsOfMeasureSlice/thunks'

// eslint-disable-next-line sort-imports
import 'styles/pages/GlobalStyles.css'
import
getMenusDataElectronCallback
  from 'redux/slices/menusSlice/callbacks/electron/getMenusDataElectronCallback'
import
getMenusIngredientsElectronCallback
  from 'redux/slices/menusSlice/callbacks/electron/getMenusIngredientsElectronCallback'
import
getPurchasePlacesDataCallback
  from 'redux/slices/purchasePlacesSlice/callbacks/electron/getPurchasePlacesDataCallback'
import
getWeeklyMenusElectronCallback
  from 'redux/slices/weeklyMenusSlice/callbacks/electron/getWeeklyMenusElectronCallback'
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
      void dispatch(getIngredientsThunk(getIngredientsDataElectronCallback))
      void dispatch(getPurchasePlacesThunk(getPurchasePlacesDataCallback))
      void dispatch(getUomDataThunk(getUomDataElectronCallback))
      void dispatch(getFoodsDataThunk({
        getFoodsData: getFoodsDataElectronCallback.getFoodsData,
        getFoodsTypesData: getFoodsDataElectronCallback.getFoodTypesData
      }))
      void dispatch(getMenusDataThunk(getMenusDataElectronCallback))
      void dispatch(getDaysThunk(getDaysElectronCallback))
      void dispatch(getWeeklyMenusThunk(getWeeklyMenusElectronCallback))
      void dispatch(getMenusIngredientsThunk(getMenusIngredientsElectronCallback))
    },
    [dispatch]
  )
  return <>
  <GlobalStyles footer header={<Header />}>
    {children}
  </GlobalStyles>
</>
}
