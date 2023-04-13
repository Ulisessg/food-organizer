/* eslint-disable max-statements */
/* eslint-disable camelcase */
import {
  type CreateUom,
  type GetUOM
} from 'controllers/food_organizer_crud/unitsOfMeasureCRUD'
import {
  type CreateUomT,
  type GetUOMT
} from 'controllers/food_organizer_crud/unitsOfMeasureTypeCRUD'
import { type units_of_measure, type units_of_measure_types } from '@prisma/client'
import { type TUpdateThunkArgs } from 'Types'
import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { type response } from 'controllers/response'

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

/*
 * Update unit of measure type thunk
 *
 *
 * This thunk doesn't return the
 * 'groupingElementIndex' because references to elements in 'units of measure grouped by type'
 *
 *
 * The computational complexity of reducer is O(n)
 */
export const updateUomtThunk = createAsyncThunk<{
  elementIndex: string
  data: units_of_measure_types
}, TUpdateThunkArgs>(
  'uomt/update',
  async (uomtData, thunkApi) => {
    const { elementId, data } = uomtData
    let uomtName: string = ''
    uomtName = data[0].value
    const updateResult = await axios.patch<response<units_of_measure_types>>(
      '/api/uomt',
      {
        id: parseInt(
          elementId,
          10
        ),
        name: uomtName
      }
    )
    if (updateResult.data.error) {
      return thunkApi.rejectWithValue(updateResult.data.data)
    }
    return {
      data: updateResult.data.data,
      elementIndex: uomtData.elementIndex
    }
  }
)

/**
 *
 * Update unit of measure
 *
 * This thunk
 * returns 'element index' and 'grouping element index'
 * to change computational complexity from O(n + m) to O(1)
 */

export const updateUnitOfMeasureThunk = createAsyncThunk<{
  data: units_of_measure
  groupingElementIndex: string
  elementIndex: string
}, TUpdateThunkArgs>(
  'uom/update',
  async (uomData, thunkApi) => {
    const { elementId, data } = uomData

    let uomName = ''
    let uomAbbreviation = ''

    data.forEach((input) => {
      const dbField = input.getAttribute('data-db-field') as 'name' | 'abbreviation'
      if (dbField === 'abbreviation') {
        uomAbbreviation = input.value
      } else if (dbField === 'name') {
        uomName = input.value
      } else {
        throw new Error('Invalid field')
      }
    })

    const updateResult = await axios.patch<response<units_of_measure>>(
      '/api/uom',
      {
        abbreviation: uomAbbreviation,
        id: parseInt(
          elementId,
          10
        ),
        name: uomName
      }
    )

    if (updateResult.data.error) {
      return thunkApi.rejectWithValue(updateResult.data.data)
    }

    return {
      data: updateResult.data.data,
      elementIndex: uomData.elementIndex,
      groupingElementIndex: uomData.groupingElementIndex as string
    }
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
