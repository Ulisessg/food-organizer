/* eslint-disable max-classes-per-file */
import { type TDatabaseMethods } from 'redux/types'

export class DatabaseActionError extends Error {
  constructor (message: string, action: string, options?: ErrorOptions) {
    super(
      '',
      options
    )
    this.name = 'Database Action Creator Error'
    console.log(this.stack)

    this.message = `
Action Name: ${action}.
  
Message: ${message}`
  }
}

export class DatabasePayloadError extends Error {
  constructor (message: string, action: string, options?: ErrorOptions) {
    super(
      '',
      options
    )

    this.name = 'Database Payload Error'
    this.message = `
Action name: ${action}.

Message: ${message}
    `
  }
}

export class DatabaseMethodError extends Error {
  constructor (message: string, method: TDatabaseMethods, options?: ErrorOptions) {
    super(
      '',
      options
    )
    this.name = 'Database Error Method'
    this.message = `
Method: ${method}
Message: ${message}
    `
  }
}
