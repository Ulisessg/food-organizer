/* eslint-disable max-lines */
/* eslint-disable max-statements */
/* eslint-disable camelcase */
import {
  type CreateUom,
  type GetUOM
} from 'controllers/food_organizer_crud/unitsOfMeasureCRUD'
import {
  type CreateUomT,
  type GetUOMT,
  type UpdateUomT
} from 'controllers/food_organizer_crud/unitsOfMeasureTypeCRUD'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { type units_of_measure, type units_of_measure_types } from '@prisma/client'
import axios from 'axios'
import insertUnitOfMeasure from 'utils/insertUnitOfMeasure'
import { type response } from 'controllers/response'

const initialState: TUomState = {
  dataIsLoading: false,
  errorGettingData: false,
  postUomEnd: false,
  postUomError: false,
  postUomIsLoading: false,
  postUomSuccess: false,
  postUomtEnd: false,
  postUomtError: false,
  postUomtIsLoading: false,
  postUomtSuccess: false,
  requestEnd: false,
  unitsOfMeasureType: [],
  uom: [],
  uomGroupedByType: [],
  updateUomtEnd: false,
  updateUomtError: false,
  updateUomtIsLoading: false,
  updateUomtSuccess: false
}

/**
 * Thunks
 */
// Get data thunk
export const getUomDataThunk = createAsyncThunk<GetUOM, number | null>(
  'uom/getData',
  async (_limit: any, thunkApi) => {
    const requestResponse = await axios.get<response<GetUOM>>('/api/uom')
    if (requestResponse.data.error) {
      thunkApi.rejectWithValue(requestResponse.data.data)
    }
    return requestResponse.data.data
  }
)

// Create Unit of measure thunk
export const createUnitOfMeasureThunk = createAsyncThunk<units_of_measure, CreateUom>(
  'uom/createUom',
  async (uom, thunkApi) => {
    const requestResponse = await axios.post<response<units_of_measure>>(
      '/api/uom',
      uom
    )
    if (requestResponse.data.error) {
      thunkApi.rejectWithValue(requestResponse.data.data)
    }
    return requestResponse.data.data
  }
)

// Create Unit of measure type thunk
export const createUnitOfMeasureTypeThunk =
createAsyncThunk<GetUOMT[0], CreateUomT>(
  'uom/createUomt',
  async (unitOfMeasureType, thunkApi) => {
    const requestResult = await axios.post<response<GetUOMT[0]>>(
      '/api/uomt',
      unitOfMeasureType
    )

    if (requestResult.data.error) {
      thunkApi.rejectWithValue(requestResult.data.data)
    }
    return requestResult.data.data
  }
)

// Update unit of measure type thunk

export const updateUomtThunk = createAsyncThunk<units_of_measure_types, UpdateUomT>(
  'uomt/update',
  async (uomtData, thunkApi) => {
    const updateResult = await axios.patch<response<units_of_measure_types>>(
      '/api/uomt',
      uomtData
    )
    if (updateResult.data.error) {
      return thunkApi.rejectWithValue(updateResult.data.data)
    }
    return updateResult.data.data
  }
)

// Restart uomt post status
export const restartCreateUomtPostStatusThunk = createAsyncThunk(
  'uomt/restart_post_status',
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

// Restart uom post status
export const restartCreateUomPostStatusThunk = createAsyncThunk(
  'uom/restart_post_status',
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
const UnitsOfMeasureSlice = createSlice({
  initialState,
  name: 'units_of_measure',
  reducers: {
  },
  // eslint-disable-next-line sort-keys, max-lines-per-function
  extraReducers: (builder) => {
    // Create Unit of measure
    builder.addCase(
      createUnitOfMeasureThunk.pending,
      (state) => {
        state.postUomIsLoading = true
        state.postUomEnd = false
        state.postUomSuccess = false
      }
    )
    builder.addCase(
      createUnitOfMeasureThunk.rejected,
      (state) => {
        state.postUomIsLoading = false
        state.postUomEnd = true
        state.postUomError = true
        state.postUomSuccess = false
      }
    )
    builder.addCase(
      createUnitOfMeasureThunk.fulfilled,
      (state, action) => {
        state.postUomEnd = true
        state.postUomIsLoading = false
        state.postUomError = false
        state.postUomSuccess = true
        state.uom = [
          ...state.uom,
          action.payload
        ]
        state.uomGroupedByType = [
          ...insertUnitOfMeasure(
            state.uomGroupedByType,
            action.payload,
            state.unitsOfMeasureType
          )
        ]
      }
    )

    // Create units of measure type
    builder.addCase(
      createUnitOfMeasureTypeThunk.pending,
      (state) => {
        state.postUomtIsLoading = true
        state.postUomtEnd = false
        state.postUomtError = false
        state.postUomtSuccess = false
      }
    )
    builder.addCase(
      createUnitOfMeasureTypeThunk.rejected,
      (state) => {
        state.postUomtError = true
        state.postUomtEnd = true
        state.postUomtIsLoading = false
        state.postUomtSuccess = false
      }
    )
    builder.addCase(
      createUnitOfMeasureTypeThunk.fulfilled,
      (state, action) => {
        state.postUomtError = false
        state.postUomtEnd = true
        state.postUomtIsLoading = false
        state.postUomtSuccess = true
        state.unitsOfMeasureType.push({
          id: action.payload.id,
          name: action.payload.name
        })
      }
    )

    // Get units of measure
    builder.addCase(
      getUomDataThunk.pending,
      (state) => {
        state.dataIsLoading = true
      }
    )
    builder.addCase(
      getUomDataThunk.rejected,
      (state) => {
        state.dataIsLoading = false
        state.requestEnd = true
        state.errorGettingData = true
      }
    )
    builder.addCase(
      getUomDataThunk.fulfilled,
      (state, action) => {
        state.dataIsLoading = false
        state.requestEnd = true
        state.errorGettingData = false

        const { unitsOfMeasureGroupedByType, unitsOfMeasureType } = action.payload
        state.uomGroupedByType = [...unitsOfMeasureGroupedByType]
        state.unitsOfMeasureType = [...unitsOfMeasureType]

        const uomT: TUomState['unitsOfMeasureType'] = []
        const uom: TUomState['uom'] = []
        unitsOfMeasureType.forEach((uomt) => {
          uomT.push({
            id: uomt.id,
            name: uomt.name
          })
        })
        unitsOfMeasureGroupedByType.forEach((unitOM) => {
          uom.push(...unitOM.uom)
        })
        state.uom = [...uom]
        state.unitsOfMeasureType = [...uomT]
      }
    )

    // Restart uomt post status
    builder.addCase(
      restartCreateUomtPostStatusThunk.fulfilled,
      (state) => {
        state.postUomtEnd = false
        state.postUomtIsLoading = false
        state.postUomtError = false
        state.postUomtSuccess = false
      }
    )
    // Restart uom post status
    builder.addCase(
      restartCreateUomPostStatusThunk.fulfilled,
      (state) => {
        state.postUomEnd = false
        state.postUomError = false
        state.postUomIsLoading = false
        state.postUomSuccess = false
      }
    )

    // Update unit of measure type
    builder.addCase(
      updateUomtThunk.pending,
      (state) => {
        state.updateUomtIsLoading = true
        state.updateUomtEnd = false
        state.updateUomtError = false
        state.updateUomtSuccess = false
      }
    )
    builder.addCase(
      updateUomtThunk.rejected,
      (state) => {
        state.updateUomtIsLoading = false
        state.updateUomtEnd = true
        state.updateUomtError = true
        state.updateUomtSuccess = false
      }
    )
    builder.addCase(
      updateUomtThunk.fulfilled,
      (state, action) => {
        state.updateUomtIsLoading = false
        state.updateUomtEnd = true
        state.updateUomtError = false
        state.updateUomtSuccess = true

        const unitsOfmeasureType: typeof state.unitsOfMeasureType = []
        state.unitsOfMeasureType.some((unitOfMeasureType) => {
          if (unitOfMeasureType.id === action.payload.id) {
            unitsOfmeasureType.push({
              ...unitOfMeasureType,
              name: action.payload.name
            })
            return true
          }
          unitsOfmeasureType.push(unitOfMeasureType)
          return false
        })

        state.unitsOfMeasureType = [...unitsOfmeasureType]
      }
    )
  }
})

export default UnitsOfMeasureSlice.reducer

interface TUomState {
  uom: GetUOM['unitsOfMeasureGroupedByType'][0]['uom']
  uomGroupedByType: GetUOM['unitsOfMeasureGroupedByType']
  unitsOfMeasureType: GetUOMT
  dataIsLoading: boolean
  errorGettingData: boolean
  requestEnd: boolean
  // Post Uom
  postUomIsLoading: boolean
  postUomEnd: boolean
  postUomError: boolean
  postUomSuccess: boolean
  // Post Uomt
  postUomtIsLoading: boolean
  postUomtEnd: boolean
  postUomtError: boolean
  postUomtSuccess: boolean

  // Update uomt
  updateUomtIsLoading: boolean
  updateUomtEnd: boolean
  updateUomtError: boolean
  updateUomtSuccess: boolean
}
