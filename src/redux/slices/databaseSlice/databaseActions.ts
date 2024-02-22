import {
  type DatabaseActionPayload,
  type TDatabaseActionCreator
} from 'redux/types'
import { createAction } from '@reduxjs/toolkit'
import { crudActionsValidations } from './utlis'

export const ActionUpdateGetStatus: TDatabaseActionCreator =
(actionName) => {
  crudActionsValidations(actionName)
  const fullActionName = `database_update_${actionName}_get_status`
  return createAction<DatabaseActionPayload>(fullActionName)
}

export const ActionUpdateCreateStatus: TDatabaseActionCreator =
(actionName) => {
  crudActionsValidations(actionName)
  const fullActionName = `database_update_${actionName}_create_status`
  return createAction<DatabaseActionPayload>(fullActionName)
}

export const ActionUpdateUpdateStatus: TDatabaseActionCreator =
(actionName) => {
  crudActionsValidations(actionName)
  const fullActionName = `database_update_${actionName}_update_status`
  return createAction<DatabaseActionPayload>(fullActionName)
}

export const ActionUpdateDeleteStatus: TDatabaseActionCreator =
(actionName) => {
  crudActionsValidations(actionName)
  const fullActionName = `database_update_${actionName}_delete_status`
  return createAction<DatabaseActionPayload>(fullActionName)
}
