/* eslint-disable func-style */
/* eslint-disable max-lines-per-function */
/* eslint-disable no-magic-numbers */
/* eslint-disable max-len */
/* eslint-disable max-lines */
/* eslint-disable max-statements */
import { invalidPropertyErrorMessage, invalidPropertyTypeErrorMessage } from 'utils/ErrorMessages'

describe(
  'utils/ErrorMessages',
  () => {
    test(
      'invalidPropertyErrorMessage',
      () => {
        expect(invalidPropertyErrorMessage(
          'name',
          'Android°',
          'only letters and spaces allowed'
        )).toStrictEqual('Invalid "name" property, only letters and spaces allowed. value: Android°')
      }
    )
    test(
      'invalidPropertyTypeErrorMessage',
      () => {
        expect(invalidPropertyTypeErrorMessage(
          'name',
          {} as unknown as string,
          'only string allowed'
        )).toStrictEqual('Invalid "name" property, only string allowed. type: object. value: [object Object]')
      }
    )
  }
)
