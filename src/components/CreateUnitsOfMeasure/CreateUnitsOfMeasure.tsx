import React, { type FC } from 'react'
import CreateUnitsOfMeasureForm from './CreateUnitsOfMeasureForm'
import Details from 'components/common/Details'

/**
 *  Forms to create 'units of measure' and 'units of measure type'
 * @returns {JSX.Element}
 */
const CreateUnitsOfMeasure: FC = (): JSX.Element => <>
  <Details summary="Crear unidad de medida">
    <CreateUnitsOfMeasureForm />
  </Details>
</>

export default CreateUnitsOfMeasure
