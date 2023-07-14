/* eslint-disable max-statements */
/* eslint-disable camelcase */

import {
  type CreateUnitsOfMeasureCallback,
  type CreateUnitsOfMeasureTypesCallback,
  type TGetUnitOfMeasureDataThunkCallback,
  type UpdateUnitsOfMeasureCallback,
  type UpdateUnitsOfMeasureReturn,
  type UpdateUnitsOfMeasureTypesCallback
} from './types'
import {
  type units_of_measure,
  type units_of_measure_types
} from 'controllers/food_organizer_crud/dbTablesTypes'
import {
  type GetUnitsOfMeasureData
} from 'controllers/food_organizer_crud/sql/unitsOfMeasure/types'
import {
  type TGetUnitsOfMeasureType
} from 'controllers/food_organizer_crud/sql/unitsOfMeasureTypes/types'
import { createAsyncThunk } from '@reduxjs/toolkit'

// Get data thunk
export const getUomDataThunk = createAsyncThunk<
GetUnitsOfMeasureData, ReturnType<TGetUnitOfMeasureDataThunkCallback>>(
  'uom/getData',
  async (getData, thunkApi) => {
    try {
      const data = await getData()
      return data
    } catch (error) {
      return thunkApi.rejectWithValue(error)
    }
  }
)

// Create Unit of measure thunk
export const createUnitOfMeasureThunk =
createAsyncThunk<units_of_measure, ReturnType<CreateUnitsOfMeasureCallback>>(
  'uom/createUom',
  async (createUom, thunkApi) => {
    try {
      const uomCreated = await createUom()
      return uomCreated
    } catch (error) {
      return thunkApi.rejectWithValue(error)
    }
  }
)

// Create Unit of measure type thunk
export const createUnitOfMeasureTypeThunk =
createAsyncThunk<TGetUnitsOfMeasureType[0], ReturnType<CreateUnitsOfMeasureTypesCallback>>(
  'uom/createUomt',
  async (createUnitOfMeasureType, thunkApi) => {
    try {
      const uomtCreated = await createUnitOfMeasureType()

      return uomtCreated
    } catch (error) {
      return thunkApi.rejectWithValue(error)
    }
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
  // Index in Uom Grouped By type
  groupingElementIndex: number
  data: units_of_measure_types
}, ReturnType<UpdateUnitsOfMeasureTypesCallback>>(
  'uomt/update',
  async (update, thunkApi) => {
    try {
      const { groupingElementIndex, data } = await update()
      return {
        data,
        groupingElementIndex: groupingElementIndex as number
      }
    } catch (error) {
      return thunkApi.rejectWithValue(error)
    }
  }
)

/**
 *
 * Update unit of measure
 *
 * This thunk
 * returns 'element index' and 'grouping element index'
 * to change computational complexity from O(n + m) to O(n)
 */

export const updateUnitOfMeasureThunk =
createAsyncThunk<UpdateUnitsOfMeasureReturn, ReturnType<UpdateUnitsOfMeasureCallback>>(
  'uom/update',
  async (update, thunkApi) => {
    try {
      const {
        data,
        elementIndex,
        groupingElementIndex,
        initialUomtId
      } = await update()

      const isUomtIdChanged = data.uomt_id !== initialUomtId
      return {
        data,
        elementIndex,
        groupingElementIndex,
        initialUomtId,
        isUomtIdChanged
      }
    } catch (error) {
      return thunkApi.rejectWithValue(error)
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

export const restartUpdateUnitOfMeasureTypeStatusThunk = createAsyncThunk(
  'uomt/restart_update_status',
  async () => {
    await new Promise((resolve) => {
      setTimeout(
        resolve,
        3000
      )
    })
  }
)

export const restartUpdateUnitsOfMeasureStatusThunk = createAsyncThunk(
  'uom/restart_update_status',
  async () => {
    await new Promise((resolve) => {
      setTimeout(
        resolve,
        3000
      )
    })
  }
)
