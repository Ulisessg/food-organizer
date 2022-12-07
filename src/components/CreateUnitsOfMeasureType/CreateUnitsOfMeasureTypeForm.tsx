import { Button, Form, TextInput } from 'd-system'
import React, { FC } from 'react'

const CreateUnitsOfMeasureTypeForm: FC = () => <>
  <Form title="Crear tipo de unidad de medida">
    <TextInput
      id="uom_name"
      inputMode="text"
      label="Nombre del tipo de unidad de medida"
      name="uom_name"
      placeholder="Liquidos, peso..."
      type="text"
    />
    <Button
      colorMessage="continue"
      size="100%"
      type="button"
      text="Crear tipo de unidad de medida"
    />
  </Form>
</>

export default CreateUnitsOfMeasureTypeForm
