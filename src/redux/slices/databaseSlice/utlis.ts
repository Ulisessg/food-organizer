import { DatabaseActionError, DatabaseMethodError, DatabasePayloadError } from './Errors'
import { type DatabaseActionPayload, type TDatabaseMethods } from 'redux/types'

export const databaseSlicePayloadValidations =
(payload: DatabaseActionPayload, actionName: string): void => {
  const { status } = payload

  const isStatusValid =
  status === 'fulfilled' ||
   status === 'pending' ||
    status === 'rejected' ||
     status === 'reset'

  if (!isStatusValid) {
    throw new DatabasePayloadError(
`
Status now allowed.

Received Status: ${status as string}
Allowed status: 'fulfilled' | 'pending' | 'rejected' | 'reset'
    `,
actionName
    )
  }
}

export const crudActionsValidations = (actionName: string): void => {
  if (typeof actionName !== 'string' || actionName.length === 0) {
    throw new DatabaseActionError(
      'Action name param must be string and at least 1 character',
      actionName
    )
  }
}

export const validateDbMethod = (dbMethod: TDatabaseMethods): void => {
  const isValidMethod =
  dbMethod === 'create' || dbMethod === 'delete' || dbMethod === 'get' || dbMethod === 'update'
  if (!isValidMethod) {
    throw new DatabaseMethodError(
      "Methods allowed: 'create' | 'delete' | 'get' | 'update'",
      dbMethod
    )
  }
}
