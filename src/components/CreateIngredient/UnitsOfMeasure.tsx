/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/naming-convention */
import React, { FC, Fragment } from 'react'
import { GetUOM } from 'controllers/food_organizer_crud/unitsOfMeasureCRUD'
import Select from 'components/common/Select'

const UnitsOfMeasure: FC<Props> = ({ data }) => <>
  <Select id="select_uom" labelText="Selecciona una unidad de medida">
       {data.map(({ uomt_id, uomt_name, uom }) => <Fragment key={uomt_id}>
          <optgroup label={uomt_name}>
            {uom.map(({ id, name }) => <Fragment key={id}>
              <option value={name}>{name}</option>
            </Fragment>)}
          </optgroup>
       </Fragment>)}
      </Select>
</>

interface Props {
  data: GetUOM
}

export default UnitsOfMeasure
