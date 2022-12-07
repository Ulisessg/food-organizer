/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/naming-convention */
import { Button, Form, LoadingSpinner, TextInput } from 'd-system'
import React, { FC, Fragment } from 'react'
import ErrorMessage from 'components/common/ErrorMessage'
import { GetUOMT } from 'controllers/food_organizer_crud/unitsOfMeasureTypeCRUD'
import Select from 'components/common/Select'
import useGetRequest from 'hooks/useGetRequest'

const CreateUnitsOfMeasureForm: FC = () => {
  const { data, error, isLoading } = useGetRequest<GetUOMT>('/api/uomt')
  const unitsOfMeasureTypes = data as GetUOMT

  return <>
  <Form title="Crear unidad de medida">
    <TextInput
      id="uom_name"
      inputMode="text"
      label="Nombre de la unidad de medida"
      name="uom"
      placeholder="Litros, piezas, gramos..."
      type="text"
    />
    <TextInput
      id="uom_abbreviation"
      inputMode="text"
      label="Abreviación de la unidad de medida"
      name="uom_abbreviation"
      placeholder="Lt, pz, gr, ml..."
      type="text"
    />
      {isLoading && <LoadingSpinner size="large" />}
      {error && <ErrorMessage
      message="Ocurrió un error obteniendo los tipo de unidad de medida"
      action="Intenta de nuevo más tarde" />}
      {(!error && !isLoading) && <>
        <Select
          labelText="Selecciona a que tipo de unidad de medida pertenece"
          id="create_uomt_select"
        >
          {unitsOfMeasureTypes.map(({ id, name }) => <Fragment key={id}>
            <option value={name}>{name}</option>
          </Fragment>)}
        </Select>
      </>}
    <Button colorMessage="continue" size="100%" type="button" text="Crear unidad de medida" />
  </Form>
</>
}

export default CreateUnitsOfMeasureForm
