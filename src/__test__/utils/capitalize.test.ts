/* eslint-disable func-style */
/* eslint-disable max-lines-per-function */
/* eslint-disable no-magic-numbers */
/* eslint-disable max-len */
/* eslint-disable max-lines */
/* eslint-disable max-statements */
import capitalize from 'utils/capitalize'

describe(
  'utils/capitslize',
  () => {
    test(
      'only accept string',
      () => {
        try {
          capitalize({} as unknown as string)
        } catch (error) {
          const err = error as Error
          expect(err.message).toStrictEqual('Only string type allowed')
        }
      }
    )
    test(
      'At least 1 character',
      () => {
        try {
          capitalize('')
        } catch (error) {
          const err = error as Error
          expect(err.message).toStrictEqual('Text must have at least 1 character')
        }
      }
    )
    test(
      'Success',
      () => {
        expect(capitalize('ensalada cesar')).toStrictEqual('Ensalada Cesar')
      }
    )
  }
)
