import { type WebSQLDatabase } from 'expo-sqlite'
import { createSlice } from '@reduxjs/toolkit'
import getDbReducer from './reducers/getDbReducer'

const initialState: DbState = {
  dbMethods: {
    closeAsync: () => {
      //
    },
    deleteAsync: async () => {
      //
    },
    exec: () => {
      //
    },
    readTransaction: () => {
      //
    },
    transaction: () => {
      //
    },
    version: ''
  },
  getDbError: false,
  getDbIsLoading: true,
  getDbSucess: false
}

const dbSlice = createSlice({
  extraReducers: (builder) => {
    getDbReducer(builder)
  },
  initialState,
  name: 'db_slice',
  reducers: {

  }
})

export default dbSlice.reducer

export interface DbState {
  dbMethods: WebSQLDatabase
  getDbIsLoading: boolean
  getDbError: boolean
  getDbSucess: boolean
}
