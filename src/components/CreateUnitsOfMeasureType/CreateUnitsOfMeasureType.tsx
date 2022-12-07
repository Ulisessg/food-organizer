import React, { FC } from 'react'
import CreateUnitsOfMeasureTypeForm from './CreateUnitsOfMeasureTypeForm'
import Details from 'components/common/Details'

const CreateUnitsOfMeasureType: FC = () => (
  <>
    <Details summary="Crear tipo de unidad de medida">
      <CreateUnitsOfMeasureTypeForm />
    </Details>
  </>
)

export default CreateUnitsOfMeasureType
