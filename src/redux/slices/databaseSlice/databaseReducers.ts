import {
  ActionUpdateCreateStatus,
  ActionUpdateDeleteStatus,
  ActionUpdateGetStatus,
  ActionUpdateUpdateStatus
} from './databaseActions'
import {
  type DatabaseActionPayload,
  type DatabaseReducers,
  type DatabaseSliceState,
  type TDatabaseMethods,
  type TDatabaseReducersStatus
} from 'redux/types'
import {
  databaseSlicePayloadValidations,
  validateDbMethod
} from './utlis'
import {
  type Draft
} from '@reduxjs/toolkit'

const UnknownActionState = new Error('Unknown Action State')

const databaseReducers: DatabaseReducers = ({ builder, name }) => {
  builder.addCase(
    ActionUpdateGetStatus(name),
    (state, action) => {
      const { payload } = action
      const { status } = action.payload
      setState({
        dbMethod: 'get',
        payload,
        state,
        status
      })
    }
  )
  builder.addCase(
    ActionUpdateCreateStatus(name),
    (state, action) => {
      const { payload } = action
      const { status } = action.payload
      setState({
        dbMethod: 'create',
        payload,
        state,
        status
      })
    }
  )
  builder.addCase(
    ActionUpdateDeleteStatus(name),
    (state, action) => {
      const { payload } = action
      const { status } = action.payload
      setState({
        dbMethod: 'delete',
        payload,
        state,
        status
      })
    }
  )
  builder.addCase(
    ActionUpdateUpdateStatus(name),
    (state, action) => {
      const { payload } = action
      const { status } = action.payload
      setState({
        dbMethod: 'update',
        payload,
        state,
        status
      })
    }
  )
}

export default databaseReducers

const setState: TSetState = ({ state, status, dbMethod, payload }) => {
  databaseSlicePayloadValidations(
    payload,
    dbMethod
  )
  validateDbMethod(dbMethod)

  switch (status) {
    case 'pending':
      state[`${dbMethod}Init`] = true
      return
    case 'rejected':
      state[`${dbMethod}Error`] = true
      state[`${dbMethod}Ends`] = true
      state[`${dbMethod}Init`] = false
      return
    case 'fulfilled':
      state[`${dbMethod}Init`] = false
      state[`${dbMethod}Success`] = true
      state[`${dbMethod}Ends`] = true
      return
    case 'reset':
      state[`${dbMethod}Error`] = false
      state[`${dbMethod}Ends`] = false
      state[`${dbMethod}Init`] = false
      state[`${dbMethod}Success`] = false
      return
    default:
      throw UnknownActionState
  }
}

type TSetState = (arg0: {
  state: Draft<DatabaseSliceState>
  status: TDatabaseReducersStatus
  dbMethod: TDatabaseMethods
  payload: DatabaseActionPayload
}) => void
