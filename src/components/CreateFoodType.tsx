import { Button, Form, TextInput } from 'd-system'
import React, { type FC } from 'react'
import Details from './common/Details'

const CreateFoodType: FC = () => (
  <Details summary="Crear tipo de comida">
    <Form formTitle="Tipo de comida">
      <TextInput
        id="food_type_name"
        inputMode="text"
        label="Nombre del tipo de comida"
        name="food_type_name"
        placeholder="Postre, bebida, ensalada"
        type="text"
      />
      <Button
        colorMessage="continue"
        size="100%"
        text="Crear tipo de comida"
        type="button"
      />
    </Form>
  </Details>
)

export default CreateFoodType
