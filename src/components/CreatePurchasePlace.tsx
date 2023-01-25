import { Button, Form, TextInput } from 'd-system'
import React, { type FC } from 'react'
import Details from 'components/common/Details'

const CreatePurchasePlace: FC = () => <>
  <Details summary="Crear lugar de compra">
  <Form formTitle="Crear lugar de compra">
    <TextInput
      id="name"
      inputMode="text"
      label="Nombre del luugar de compra"
      name="address"
      placeholder="Tianguis, mercado..."
      type="text"
    />
    <TextInput
      id="address"
      inputMode="text"
      label="Dirección (opcional)"
      name="address"
      placeholder="Benito López 24"
      type="text"
    />
    <Button
      colorMessage="continue"
      size="100%"
      text="Añadir nueva dirección"
      type="button"
    />
  </Form>
  </Details>
</>

export default CreatePurchasePlace
