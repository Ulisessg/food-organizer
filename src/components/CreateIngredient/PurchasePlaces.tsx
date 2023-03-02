import { ButtonAddSelect, ButtonDeleteSelect, Container } from 'components/common/MultipleSelects'
import React, { type ChangeEvent, type FC, Fragment, useEffect } from 'react'
import { Select, useInputs } from 'd-system'
import { type RootState } from 'redux/store'
import { defaultSelectValue } from 'utils/constants'
import randomId from 'utils/randomId'
import useMultipleSelects from 'hooks/useMultipleSelects'
import { useSelector } from 'react-redux'

const PurchasePlaces: FC<PurchasePlacesProps> = ({ restartMultipleSelects }) => {
  const purchasePlacesData = useSelector((state: RootState) => state.purchasePlaces)
  const {
    addSelect,
    data,
    deleteSelect,
    disableButton,
    onChange: UseMultipleSelectsOnChange,
    resetMultipleSelect
  } = useMultipleSelects(
    'purchase_places',
    purchasePlacesData.purchasePlaces.length
  )

  useEffect(
    () => {
      if (restartMultipleSelects) {
        resetMultipleSelect()
      }
    },
    [restartMultipleSelects]
  )
  return <>
    {data.selects.map(({ selectId }) => <Fragment key={selectId}>
    <PurchasePlace
      id={selectId}
      purchasePlaces={purchasePlacesData.purchasePlaces}
      deleteSelect={deleteSelect}
      valuesUsed={data.valuesUsed}
      UseMultipleSelectsOnChange={UseMultipleSelectsOnChange}
    />
    </Fragment>)}
    <ButtonAddSelect
      disabled={disableButton}
      text="Añadir lugar de compra"
      onClick={addSelect}
    />
  </>
}

const PurchasePlace: FC<PurchasePlaceProps> = ({
  id,
  purchasePlaces,
  deleteSelect,
  valuesUsed,
  UseMultipleSelectsOnChange
}) => {
  const { inputsData, onChange: UseInputsOnChange } = useInputs(
    {
      [id]: defaultSelectValue
    },
    false
  )
  const onChange = (ev: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    UseMultipleSelectsOnChange(ev)
    UseInputsOnChange(ev as any)
  }

  return <Container>
    <Select
    id={id}
    label="Selecciona un lugar de compra"
    name={id}
    value={inputsData[id]}
    onChange={onChange}
  >
  <option value={defaultSelectValue} disabled>{defaultSelectValue}</option>
  {purchasePlaces.map((purchasePlace) => <Fragment key={randomId('purchase_place')}>
      <option
        value={purchasePlace.name}
        disabled={valuesUsed.some((value) => value === purchasePlace.name)}
      >
        {purchasePlace.name}
      </option>
  </Fragment>)}
  </Select>
  <ButtonDeleteSelect data-select-id={id} onClick={deleteSelect} />
</Container>
}

interface PurchasePlaceProps {
  id: string
  purchasePlaces: RootState['purchasePlaces']['purchasePlaces']
  deleteSelect: ReturnType<typeof useMultipleSelects>['deleteSelect']
  valuesUsed: string[]
  UseMultipleSelectsOnChange: ReturnType<typeof useMultipleSelects>['onChange']
}

interface PurchasePlacesProps {
  restartMultipleSelects: boolean
}

export default PurchasePlaces
