import { type DbState } from './slice'
import { createAsyncThunk } from '@reduxjs/toolkit'
import openDb from 'controllers/food_organizer_crud/db/openDb'

export const getDbThunk = createAsyncThunk<DbState['dbMethods']>(
  'db/get',
  async (_args, thunkApi) => {
    const db = await openDb()
    if (db instanceof Error) return thunkApi.rejectWithValue('error') as any
    return db
  }
)
