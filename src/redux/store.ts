import { configureStore } from '@reduxjs/toolkit'
import foodSlice from './slices/foodsSlice'
import ingredientsSlice from './slices/ingredientsSlice'
import ingredientsStockSlice from './slices/ingredientsStockSlice'
import menusSlice from './slices/menusSlice'
import purchasePlacesSlice from './slices/purchasePlacesSlice'
import unitsOfMeasureSlice from './slices/unitsOfMeasureSlice'
import weekSlice from './slices/weeklyMenusSlice/slice'

export const store = configureStore({
  reducer: {
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
