import { ISO8601Date, lettersAndUnderscore } from 'utils/RegExps'
import { invalidPropertyErrorMessage, invalidPropertyTypeErrorMessage } from 'utils/ErrorMessages'

const verifications: verifyObj = {
  allowModifications: (allow: boolean) => {
    if (typeof allow !== 'boolean') {
      throw new TypeError(invalidPropertyTypeErrorMessage(
        'allowModifications',
        allow,
        'only boolean allowed'
      ))
    }
  },
  creationDate: (date: string) => {
    if (date.match(ISO8601Date) === null) {
      throw new Error(invalidPropertyErrorMessage(
        'creationDate',
        date,
        'only ISO8601 date allowed, such as: 2019-01-25T02:00:00.000Z'
      ))
    }
  },
  id: (id: number) => {
    if (typeof id === 'number') {
      if (!Number.isInteger(id)) {
        throw new TypeError(invalidPropertyTypeErrorMessage(
          'id',
          id,
          'only integer number allowed'
        ))
      }
    } else if (id !== null) {
      throw new TypeError(invalidPropertyTypeErrorMessage(
        'id',
        id,
        'only number or null allowed'
      ))
    }
  },
  tableName: (tableName: string) => {
    if (typeof tableName !== 'string') {
      throw new TypeError(invalidPropertyTypeErrorMessage(
        'tableName',
        tableName,
        'only string allowed'
      ))
    }
    // Avoid sql injection
    if (tableName.match(lettersAndUnderscore) === null) {
      throw new Error(invalidPropertyErrorMessage(
        'tableName',
        tableName,
        'only accept letters upper and lower case and underscore, NO spaces'
      ))
    }
  }

}

type verifyObj = {
  [k in verifyProperties]: (value: any) => void
}

type verifyProperties = 'tableName' | 'id' | 'creationDate' | 'allowModifications'

export default verifications
