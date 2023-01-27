import {
  ButtonAddSelect,
  ButtonDeleteSelect,
  Container as MultipleSelectsContainer
} from '../common/MultipleSelects'
import React, { type FC, Fragment } from 'react'
import { type GetPurchasePlaces } from 'controllers/food_organizer_crud/purchasePlaceCRUD'
import { Select } from 'd-system'
import randomId from 'utils/randomId'
import useMultipleSelects from 'hooks/useMultipleSelects'

// eslint-disable-next-line max-lines-per-function
const PurchasePlaces: FC<Props> = ({ data }) => {
  const {
    addSelect, data: ppData,
    deleteSelect, onChange: handleSelectChange
  } = useMultipleSelects()

  return <>
    {ppData.selects.map(({ selectId }, indx) => <Fragment key={randomId()}>
    {indx === 0 &&
    <Select
      id={ppData.selectsValues[indx].selectId}
      label="Selecciona un lugar de compra"
      key={selectId}
      onChange={handleSelectChange}
      value={ppData.selectsValues[indx].value}
      name="PP"
      acceptanceCriteria="Opcional"
      >
        {data.map(({ id, name }) => <Fragment key={id}>
          <option
          value={name}
          disabled={
            typeof ppData.valuesUsed.find((ppUsed) => ppUsed === name) !== 'undefined'
          }
          >{name}</option>
        </Fragment>)}
    </Select>
    }
    {indx !== 0 &&
    <MultipleSelectsContainer key={selectId}>
    <Select
      id={ppData.selectsValues[indx].selectId} label="Selecciona un lugar de compra"
      onChange={handleSelectChange}
      value={ppData.selectsValues[indx].value}
      name="PP"
      acceptanceCriteria="Opcional"
      >
            {data.map(({ id, name }) => <Fragment key={id}>
              <option
              value={name}
              disabled={
            typeof ppData.valuesUsed.find((ppUsed) => ppUsed === name) !== 'undefined'
              }
              >{name}</option>
            </Fragment>)}
          </Select>
          <ButtonDeleteSelect
            data-select-id={selectId}
            onClick={deleteSelect}
          />
        </MultipleSelectsContainer>}
    </Fragment>)}

    <ButtonAddSelect
      disabled={ppData.selects.length === data.length}
      text="Añadir lugar de compra"
      onClick={addSelect}
    />
</>
}

interface Props {
  data: GetPurchasePlaces
  initialSelectId: string
}

export default PurchasePlaces
