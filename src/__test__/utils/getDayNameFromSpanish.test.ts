/* eslint-disable func-style */
/* eslint-disable max-lines-per-function */
/* eslint-disable no-magic-numbers */
/* eslint-disable max-len */
/* eslint-disable max-lines */
/* eslint-disable max-statements */

import getDayNameFromSpanish from 'utils/getDayNameFromSpanish'

describe(
  'utils/getDayNameFromSpanish',
  () => {
    test(
      'lunes',
      () => {
        expect(getDayNameFromSpanish('lunes')).toStrictEqual('monday')
      }
    )
    test(
      'martes',
      () => {
        expect(getDayNameFromSpanish('martes')).toStrictEqual('tuesday')
      }
    )
    test(
      'miercoles',
      () => {
        expect(getDayNameFromSpanish('miercoles')).toStrictEqual('wednesday')
      }
    )
    test(
      'jueves',
      () => {
        expect(getDayNameFromSpanish('jueves')).toStrictEqual('thursday')
      }
    )
    test(
      'viernes',
      () => {
        expect(getDayNameFromSpanish('viernes')).toStrictEqual('friday')
      }
    )
    test(
      'sábado',
      () => {
        expect(getDayNameFromSpanish('sábado')).toStrictEqual('saturday')
      }
    )
    test(
      'domingo',
      () => {
        expect(getDayNameFromSpanish('domingo')).toStrictEqual('sunday')
      }
    )
    test(
      'Unknow day',
      () => {
        try {
          getDayNameFromSpanish('Any day' as any)
        } catch (error) {
          const err = error as Error
          expect(err.message).toStrictEqual('Ese dia no existe')
        }
      }
    )
  }
)
