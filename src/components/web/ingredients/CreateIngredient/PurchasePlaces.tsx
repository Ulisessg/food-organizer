/* eslint-disable max-lines-per-function */
import { Button, Select } from 'd-system'
import {
  ButtonAddSelect, Container
} from 'components/web/common/MultipleSelects'
import React, { type FC, Fragment, useContext, useEffect } from 'react'
import {
  MultipleSelectsContext
} from 'context/MultipleSelectsContext'
import { type RootState } from 'redux/store'
import { defaultSelectValue } from 'utils/constants'
import randomId from 'utils/randomId'
import { useSelector } from 'react-redux'

const PurchasePlaces: FC<PurchasePlacesProps> = ({ restartMultipleSelects }) => {
  const {
    resetMultipleSelect,
    data,
    disableButton,
    addSelect
  } = useContext(MultipleSelectsContext)

  useEffect(
    () => {
      if (restartMultipleSelects && data.selects.length > 0) {
        resetMultipleSelect()
      }
    },
    [
      restartMultipleSelects,
      data.selects.length
    ]
  )
  return <>
    {data.selects.map(({ selectId, value }, index) => <Fragment key={selectId}>
    <PurchasePlace
      selectId={selectId}
      selectValue={value}
      selectIndex={index}
    />
    </Fragment>)}
    <ButtonAddSelect
      disabled={disableButton}
      text="Añadir lugar de compra"
      onClick={ () => { addSelect() }}
    />
  </>
}

const PurchasePlace: FC<PurchasePlaceProps> = ({
  selectId,
  selectValue,
  selectIndex
}) => {
  const { deleteSelect, onChange, data } = useContext(MultipleSelectsContext)
  const purchasePlaces = useSelector((state: RootState) => state.purchasePlaces.purchasePlaces)

  return <Container>
    <Select
    id={selectId}
    label="Selecciona un lugar de compra"
    name={selectId}
    value={data.selects[Number(selectIndex)].value}
    onChange={(ev) => {
      onChange(
        ev.currentTarget.value,
        selectIndex
      )
    }}
  >
  <option value={defaultSelectValue} disabled>{defaultSelectValue}</option>
  {purchasePlaces.map((purchasePlace) => <Fragment key={randomId('purchase_place')}>
      <option
        value={purchasePlace.name}
        disabled={data.valuesUsed.some((value) => value === purchasePlace.name)}
      >
        {purchasePlace.name}
      </option>
  </Fragment>)}
  </Select>
  <Button
    colorMessage="cancel"
    size="100%"
    type="button"
    text="X"
    onClick={() => {
      deleteSelect(
        selectId,
        selectValue,
        selectIndex
      )
    }}
  />
</Container>
}

interface PurchasePlaceProps {
  selectId: string
  selectValue: string
  selectIndex: number
}

interface PurchasePlacesProps {
  restartMultipleSelects: boolean
}

export default PurchasePlaces
