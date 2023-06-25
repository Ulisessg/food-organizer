import { type CreatePurchasePlacesCallback, type GetPurchasePlacesDataCallback } from './types'
import {
  type GetPurchasePlaces
} from 'controllers/food_organizer_crud/sql/purchasePlaces/types'
import { createAsyncThunk } from '@reduxjs/toolkit'

// Get purchase places thunk
export const getPurchasePlacesThunk =
 createAsyncThunk<GetPurchasePlaces, GetPurchasePlacesDataCallback>(
   'purchase_places/get_data',
   async (getData, thunkAPi) => {
     try {
       const requestResult = await getData()
       return requestResult
     } catch (error) {
       return thunkAPi.rejectWithValue(error)
     }
   }
 )

// Create purchase place thunk
export const createPurchasePlaceThunk = createAsyncThunk<
GetPurchasePlaces[0], ReturnType<CreatePurchasePlacesCallback
>>(
  'purchase_places/create',
  async (createPurchasePlace, thunkApi) => {
    try {
      const purchasePlaceCreated = await createPurchasePlace()
      return purchasePlaceCreated
    } catch (error) {
      return thunkApi.rejectWithValue(error)
    }
  }
)

// Restart post state
export const restartPurchasePlacePostStateThunk = createAsyncThunk(
  'purchase_places/restart_post_state',
  async () => {
    await new Promise((resolve) => {
      setTimeout(
        () => {
          resolve('')
        },
        3000
      )
    })
  }
)
