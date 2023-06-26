/* eslint-disable func-style */
/* eslint-disable max-lines-per-function */
/* eslint-disable no-magic-numbers */
/* eslint-disable max-len */
/* eslint-disable max-lines */
/* eslint-disable max-statements */

import getDayNameFromEnglish from 'utils/getDayNameFromEnglish'

describe(
  'utils/getDayNameFromEnglish',
  () => {
    test(
      'get monday',
      () => {
        expect(getDayNameFromEnglish('monday')).toStrictEqual('lunes')
      }
    )
    test(
      'get tuesday',
      () => {
        expect(getDayNameFromEnglish('tuesday')).toStrictEqual('martes')
      }
    )
    test(
      'get wednesday',
      () => {
        expect(getDayNameFromEnglish('wednesday')).toStrictEqual('miercoles')
      }
    )
    test(
      'get thursday',
      () => {
        expect(getDayNameFromEnglish('thursday')).toStrictEqual('jueves')
      }
    )
    test(
      'get friday',
      () => {
        expect(getDayNameFromEnglish('friday')).toStrictEqual('viernes')
      }
    )
    test(
      'get saturday',
      () => {
        expect(getDayNameFromEnglish('saturday')).toStrictEqual('sábado')
      }
    )
    test(
      'get sunday',
      () => {
        expect(getDayNameFromEnglish('sunday')).toStrictEqual('domingo')
      }
    )
    test(
      'Unknow day',
      () => {
        try {
          getDayNameFromEnglish('Any' as unknown as any)
        } catch (error) {
          const err = error as Error
          expect(err.message).toStrictEqual('Ese dia no existe')
        }
      }
    )
  }
)
