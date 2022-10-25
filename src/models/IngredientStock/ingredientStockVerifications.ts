import { invalidPropertyTypeErrorMessage } from 'utils/ErrorMessages'

const verifications: verifyObj = {
  comment: (comment: string) => {
    if (typeof comment !== 'string') {
      if (comment !== null) {
        throw new TypeError(invalidPropertyTypeErrorMessage(
          'comment',
          comment,
          'only string or null allowed'
        ))
      }
    }
  },
  ingredientId: (id: number) => {
    verifyId(
      id,
      'ingredientId'
    )
  },
  uomId: (id: number) => {
    verifyId(
      id,
      'uomId'
    )
  }
}

const verifyId = (id: number, idProp: Omit<verifyProps, 'comment'>): void => {
  if (!Number.isInteger(id)) {
    throw new TypeError(invalidPropertyTypeErrorMessage(
      idProp as string,
      id,
      'only integer number allowed'
    ))
  }
}

 type verifyObj = {
   [k in verifyProps]: (value: any) => void
 }

export type verifyProps = 'ingredientId' | 'uomId' | 'comment'

export default verifications
