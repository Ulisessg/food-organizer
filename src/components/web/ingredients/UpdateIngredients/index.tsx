import React, { type FC } from 'react'
import { ModalUpdateData } from 'components/web/common/ModalUpdateData'
import ModalUpdateIngredientsContent from './ModalContent'

const ModalUpdateIngredients: FC = () => <ModalUpdateData>
  <ModalUpdateIngredientsContent />
</ModalUpdateData>

export default ModalUpdateIngredients
