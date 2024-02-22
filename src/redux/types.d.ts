import {
  type ActionCreatorWithPayload,
  type ActionReducerMapBuilder
} from '@reduxjs/toolkit'

export type TReducerWBuilder<T> = (builder: ActionReducerMapBuilder<T>) => void

// Database - Start
export type DatabaseReducers = (arg0: {
  builder: ActionReducerMapBuilder<DatabaseSliceState>

  /**
   * A unique name to differentiate actions and update the proper slice
   */
  name: string
}) => void

export type DatabaseReducerState = DatabaseSliceState & Record<string, any>

export interface DatabaseSliceState extends Record<'getInit' |
'getSuccess' |
'getEnds' |
'getError' |
'createInit' |
'createSuccess' |
'createEnds' |
'createError' |
'updateInit' |
'updateSuccess' |
'updateEnds' |
'updateError' |
'deleteInit' |
'deleteSuccess' |
'deleteEnds' |
'deleteError', boolean> {}

export type TDatabaseReducersStatus = 'pending' | 'rejected' | 'fulfilled' | 'reset'
export type TDatabaseMethods = 'get' | 'update' | 'create' | 'delete'

export type TDatabaseActionCreator =
(actionName: string) => ActionCreatorWithPayload<DatabaseActionPayload>

export interface DatabaseActionPayload {
  status: TDatabaseReducersStatus
}

// Database - Ends
