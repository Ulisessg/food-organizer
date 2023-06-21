import {
  type CreatePurchasePlace
} from 'controllers/food_organizer_crud/sql/purchasePlaces/createPurchasePlacesSql'
import {
  type GetPurchasePlaces
} from 'controllers/food_organizer_crud/sql/purchasePlaces/types'
import { type GetPurchasePlacesDataCallback } from './types'
import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { type purchase_places } from '@prisma/client'
import { type response } from 'controllers/response'

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
export const createPurchasePlaceThunk = createAsyncThunk<purchase_places, CreatePurchasePlace>(
  'purchase_places/create',
  async (purchasePlace, thunkApi) => {
    const requestResponse = await axios.post<response<purchase_places>>(
      '/api/purchase',
      purchasePlace
    )
    if (requestResponse.data.error) {
      thunkApi.rejectWithValue(requestResponse.data.data)
    }
    return requestResponse.data.data
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
