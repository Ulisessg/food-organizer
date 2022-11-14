import { Container, Summary } from './CreateUnitsOfMeasure.styles'
import CreateUnitsOfMeasureForm, { CreateUomFormProps } from './CreateUnitsOfMeasureForm'
import React, { FC } from 'react'
import CreateUnitsOfMeasureTypeForm from './CreateUnitsOfMeasureTypeForm'
import Details from 'components/common/Details'

/**
 *  Forms to create 'units of measure' and 'units of measure type'
 * @returns {JSX.Element}
 */
const CreateUnitsOfMeasure: FC<CreateUomFormProps> = ({ unitsOfMeasureTypes }): JSX.Element => (
    <Container>
      <Details>
        <Summary>Crear tipo de unidad de medida</Summary>
        <CreateUnitsOfMeasureTypeForm />
      </Details>
      <Details>
        <Summary>Crear unidad de medida</Summary>
        <CreateUnitsOfMeasureForm unitsOfMeasureTypes={unitsOfMeasureTypes}/>
      </Details>
    </Container>
)

export default CreateUnitsOfMeasure
