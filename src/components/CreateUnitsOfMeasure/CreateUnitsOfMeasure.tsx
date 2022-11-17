import CreateUnitsOfMeasureForm, { CreateUomFormProps } from './CreateUnitsOfMeasureForm'
import React, { FC } from 'react'
import CreateUnitsOfMeasureTypeForm from './CreateUnitsOfMeasureTypeForm'
import Details from 'components/common/Details'

/**
 *  Forms to create 'units of measure' and 'units of measure type'
 * @returns {JSX.Element}
 */
const CreateUnitsOfMeasure: FC<CreateUomFormProps> = ({ unitsOfMeasureTypes }): JSX.Element => (<>
      <Details summary="Crear tipo de unidad de medida">
        <CreateUnitsOfMeasureTypeForm />
      </Details>
      <Details summary="Crear unidad de medida">
        <CreateUnitsOfMeasureForm unitsOfMeasureTypes={unitsOfMeasureTypes}/>
      </Details>
</>
)

export default CreateUnitsOfMeasure
