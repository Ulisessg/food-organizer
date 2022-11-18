/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/naming-convention */
import { Button, Form, TextInput } from 'd-system'
import React, { FC, Fragment } from 'react'
import { GetUOM } from 'controllers/food_organizer_crud/unitsOfMeasureCRUD'
import Select from 'components/common/Select'

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
      label="Abreviación de la unidad de medida"
      name="uom_abbreviation"
      placeholder="Lt, pz, gr, ml..."
      type="text"
    />
      <Select
      labelText="Selecciona a que tipo de unidad de medida pertenece"
        id="create_uomt_select"
      >
        <>
        {unitsOfMeasureTypes.map(({ uomt_id, uomt_name }) => <Fragment key={uomt_id}>
            <option value={uomt_name}>{uomt_name}</option>
          </Fragment>)}
        </>
      </Select>
    <Button colorMessage="continue" size="100%" type="button" text="Crear unidad de medida" />
  </Form>
</>

export interface CreateUomFormProps {
  unitsOfMeasureTypes: Array<Pick<GetUOM[0], 'uomt_id' | 'uomt_name'>>
}

export default CreateUnitsOfMeasureForm
