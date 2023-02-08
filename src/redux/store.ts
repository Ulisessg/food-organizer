import { HYDRATE, createWrapper } from 'next-redux-wrapper'
import { configureStore } from '@reduxjs/toolkit'
import ingredientsSlice from './slices/ingredientsSlice'
import purchasePlacesSlice from './slices/purchasePlacesSlice'
import unitsOfMeasureSlice from './slices/unitsOfMeasureSlice'

const store = configureStore({
  reducer: {
    [HYDRATE]: (state: any, action) => ({ ...state, ...action.payload }),
    ingredients: ingredientsSlice,
    purchasePlaces: purchasePlacesSlice,
    unitsOfMeasure: unitsOfMeasureSlice
  }
})

const nodeEnv = process.env.NODE_ENV

export const wrapper = createWrapper(
  () => store,
  { debug: (nodeEnv === 'development' || nodeEnv === 'test') }
)

export type RootState = ReturnType<typeof store['getState']>
export type AppDispatch = typeof store['dispatch']
