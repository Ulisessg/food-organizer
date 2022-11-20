/* eslint-disable max-statements */
import { ButtonAddPP, Container } from './CreateIngredient.styles'
import React, { FC, Fragment, MouseEvent, useEffect, useState } from 'react'
import { Button } from 'd-system'
import { GetPurchasePlaces } from 'controllers/food_organizer_crud/purchasePlaceCRUD'
import Select from 'components/common/Select'
import randomId from 'utils/randomId'
const initialSelectValue = 'Selecciona una opcion'
// eslint-disable-next-line max-lines-per-function
const PurchasePlaces: FC<Props> = ({ data, initialSelectId }) => {
  const [
    stateData,
    setStateData
  ] = useState<StateData>({
    purchasePlaces: [...data],
    purchasePlacesUsed: [],
    selects: [{ selectId: initialSelectId }],
    selectsValues: [
      {
        prevValue: initialSelectValue,
        selectId: initialSelectId,
        selectValue: initialSelectValue
      }
    ]
  })

  const handleSelectChange = (ev: React.ChangeEvent<HTMLSelectElement>): void => {
    const elementId = ev.currentTarget.id
    const elementValue = ev.currentTarget.value
    let selectPrevValue: string = ''

    const nData: StateData['selectsValues'] = stateData.selectsValues.map((selectVal, index) => {
      const { selectId } = selectVal
      if (selectId === elementId) {
        selectPrevValue = stateData.selectsValues[index].selectValue
        return {
          prevValue: selectPrevValue,
          selectId,
          selectValue: elementValue
        }
      }

      return { ...selectVal }
    })
    setStateData({
      ...stateData,
      purchasePlacesUsed:
       [
         ...stateData.purchasePlacesUsed.filter((ppUsed) => ppUsed !== selectPrevValue),
         elementValue
       ],
      selectsValues: [...nData]
    })
  }
  const addPurchasePlace = (): void => {
    const nId = randomId()
    setStateData((prev) => ({
      ...prev,
      selects: [
        ...prev.selects,
        { selectId: nId }
      ],
      selectsValues: [
        ...prev.selectsValues,
        { prevValue: initialSelectValue, selectId: nId, selectValue: initialSelectValue }
      ]
    }))
  }
  const deletePurchasePlace = (ev: MouseEvent<HTMLButtonElement>): void => {
    const id: string = ev.currentTarget.getAttribute('data-id') as string
    const selectElement: HTMLSelectElement =
ev.currentTarget.previousSibling?.childNodes[1] as HTMLSelectElement
    const selectValue: string = selectElement.value

    setStateData((prev) => ({
      ...prev,
      purchasePlacesUsed: [...prev.purchasePlacesUsed.filter((ppUsed) => ppUsed !== selectValue)],
      selects: [...prev.selects.filter((element) => element.selectId !== id)],
      selectsValues: [...prev.selectsValues.filter((element) => element.selectId !== id)]
    }))
  }
  useEffect(
    () => {
      setStateData({
        purchasePlaces: [...data],
        purchasePlacesUsed: [],
        selects: [{ selectId: initialSelectId }],
        selectsValues: [
          {
            prevValue: initialSelectValue,
            selectId: initialSelectId,
            selectValue: initialSelectValue
          }
        ]
      })
    },
    [
      data,
      initialSelectId
    ]
  )
  return <>
    {stateData.selects.map(({ selectId }, indx) => <Fragment key={randomId()}>
    {indx === 0 &&
    <Select
      id={stateData.selectsValues[indx].selectId}
      labelText="Selecciona un lugar de compra"
      key={selectId}
      onChange={handleSelectChange}
      value={stateData.selectsValues[indx].selectValue}
      >
        {stateData.purchasePlaces.map(({ id, name }) => <Fragment key={id}>
          <option
          value={name}
          disabled={
            typeof stateData.purchasePlacesUsed.find((ppUsed) => ppUsed === name) !== 'undefined'
          }
          >{name}</option>
        </Fragment>)}
    </Select>
    }
    {indx !== 0 &&
    <Container key={selectId}>
    <Select
      id={stateData.selectsValues[indx].selectId} labelText="Selecciona un lugar de compra"
      onChange={handleSelectChange}
      value={stateData.selectsValues[indx].selectValue}>
            {stateData.purchasePlaces.map(({ id, name }) => <Fragment key={id}>
              <option
              value={name}
              disabled={
            typeof stateData.purchasePlacesUsed.find((ppUsed) => ppUsed === name) !== 'undefined'
              }
              >{name}</option>
            </Fragment>)}
          </Select>
          <Button
            colorMessage="cancel"
            size="100%"
            text="X"
            type="button"
            onClick={deletePurchasePlace}
            data-id={selectId}
          />
        </Container>}
    </Fragment>)}

        <ButtonAddPP
          colorMessage="info"
          size="100%"
          text="Añadir lugar de compra"
          type="button"
          onClick={addPurchasePlace}
          disabled={(data.length === stateData.selects.length)}
        />
</>
}

interface Props {
  data: GetPurchasePlaces
  initialSelectId: string
}

interface StateData {
  purchasePlaces: GetPurchasePlaces
  selects: Array<{ selectId: string }>
  selectsValues: Array<{
    prevValue: string
    selectId: string
    selectValue: string
  }>
  purchasePlacesUsed: string[]
}

export default PurchasePlaces
