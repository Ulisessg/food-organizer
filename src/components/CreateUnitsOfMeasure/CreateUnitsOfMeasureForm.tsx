/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/naming-convention */
import { Button, Form, TextInput } from 'd-system'
import { LabelSelect, Select } from './CreateUnitsOfMeasure.styles'
import React, { FC, Fragment } from 'react'
import { GetUOM } from 'controllers/food_organizer_crud/unitsOfMeasureCRUD'

const CreateUnitsOfMeasureForm: FC<CreateUomFormProps> = ({ unitsOfMeasureTypes }) => <>
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
      label="Nombre de la unidad de medida"
      name="uom"
      placeholder="Litros, piezas, gramos..."
      type="text"
    />
    <LabelSelect htmlFor="create_uomt_select">
      <p>Selecciona a que tipo de unidad de medida pertenece</p>
      <Select name="create_uomt_select"
      id="create_uomt_select" defaultValue="Selecciona una opcion">
      <option value="Selecciona una opcion" disabled>-- Selecciona una opcion --</option>
        {unitsOfMeasureTypes.map(({ uomt_id, uomt_name }) => <Fragment key={uomt_id}>
            <option value={uomt_name}>{uomt_name}</option>
          </Fragment>)}
      </Select>
    </LabelSelect>
    <Button colorMessage="continue" size="100%" type="button" text="Crear unidad de medida" />
  </Form>
</>

export interface CreateUomFormProps {
  unitsOfMeasureTypes: Array<Pick<GetUOM[0], 'uomt_id' | 'uomt_name'>>
}

export default CreateUnitsOfMeasureForm
