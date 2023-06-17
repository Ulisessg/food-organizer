/* eslint-disable max-lines-per-function */
/* eslint-disable camelcase */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  type CreatePurchasePlace
} from 'controllers/food_organizer_crud/sql/purchasePlaces/createPurchasePlacesSql'
import {
  type GetPurchasePlaces
} from 'controllers/food_organizer_crud/sql/purchasePlaces/types'
import axios from 'axios'
import { type purchase_places } from '@prisma/client'
import { type response } from 'controllers/response'

const initialState: TPurchasePlacesState = {
  dataIsLoading: false,
  getRequestEnd: false,
  getRequestError: false,
  postPPEnd: false,
  postPPError: false,
  postPPIsLoading: false,
  postPPSuccess: false,
  purchasePlaces: []
}

/**
 * Thunks
 */

// Get purchase places thunk
export const getPurchasePlacesThunk = createAsyncThunk<GetPurchasePlaces, number | null>(
  'purchase_places/get_data',
  async (_limit, thunkAPi) => {
    const requestResult = await axios.get<response<GetPurchasePlaces>>('/api/purchase')
    if (requestResult.data.error) {
      thunkAPi.rejectWithValue(requestResult.data.data)
    }
    return requestResult.data.data
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

/**
 * Slice
 */
const purchasePlacesSlice = createSlice({
  initialState,
  name: 'purchase_places',
  reducers: {
  },
  // eslint-disable-next-line sort-keys
  extraReducers: (builder) => {
    // Getpurchase places
    builder.addCase(
      getPurchasePlacesThunk.pending,
      (state) => {
        state.dataIsLoading = true
        state.getRequestError = false
        state.getRequestEnd = false
      }
    )
    builder.addCase(
      getPurchasePlacesThunk.rejected,
      (state) => {
        state.dataIsLoading = false
        state.getRequestError = true
        state.getRequestEnd = true
      }
    )
    builder.addCase(
      getPurchasePlacesThunk.fulfilled,
      (state, action) => {
        state.dataIsLoading = false
        state.getRequestError = false
        state.getRequestEnd = true
        state.purchasePlaces = [...action.payload]
      }
    )

    // Create purchase place
    builder.addCase(
      createPurchasePlaceThunk.pending,
      (state) => {
        state.postPPEnd = false
        state.postPPError = false
        state.postPPIsLoading = true
        state.postPPSuccess = false
      }
    )
    builder.addCase(
      createPurchasePlaceThunk.rejected,
      (state) => {
        state.postPPEnd = true
        state.postPPError = true
        state.postPPIsLoading = false
        state.postPPSuccess = false
      }
    )
    builder.addCase(
      createPurchasePlaceThunk.fulfilled,
      (state, action) => {
        state.postPPEnd = true
        state.postPPError = false
        state.postPPIsLoading = false
        state.postPPSuccess = true
        state.purchasePlaces = [
          ...state.purchasePlaces,
          action.payload
        ]
      }
    )

    // Restart post state
    builder.addCase(
      restartPurchasePlacePostStateThunk.fulfilled,
      (state) => {
        state.postPPEnd = false
        state.postPPError = false
        state.postPPIsLoading = false
        state.postPPSuccess = false
      }
    )
  }
})

export default purchasePlacesSlice.reducer

// Add post successfull value: TODO
interface TPurchasePlacesState {
  // Get data
  dataIsLoading: boolean
  getRequestError: boolean
  getRequestEnd: boolean
  purchasePlaces: GetPurchasePlaces
  // Create purchase place
  postPPIsLoading: boolean
  postPPError: boolean
  postPPEnd: boolean
  postPPSuccess: boolean
}
