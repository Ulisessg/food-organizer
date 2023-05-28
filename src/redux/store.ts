import { configureStore } from '@reduxjs/toolkit'
import dbSlice from './slices/dbSlice'
import foodSlice from './slices/foodSlice'
import ingredientsSlice from './slices/ingredientsSlice'
import ingredientsStockSlice from './slices/ingredientsStockSlice'
import menusSlice from './slices/menusSlice'
import purchasePlacesSlice from './slices/purchasePlacesSlice'
import unitsOfMeasureSlice from './slices/unitsOfMeasureSlice'
import weekSlice from './slices/weekSlice'

export const store = configureStore({
  reducer: {
    db: dbSlice,
    foods: foodSlice,
    ingredients: ingredientsSlice,
    ingredientsStock: ingredientsStockSlice,
    menus: menusSlice,
    purchasePlaces: purchasePlacesSlice,
    unitsOfMeasure: unitsOfMeasureSlice,
    weeklyMenus: weekSlice
  }
})

export type RootState = ReturnType<typeof store['getState']>
export type AppDispatch = typeof store['dispatch']
