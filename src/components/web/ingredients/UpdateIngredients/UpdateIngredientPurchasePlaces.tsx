import {
  ButtonAddSelect,
  ButtonDeleteSelect,
  Container
} from '../../common/MultipleSelects'
import React, { type FC, Fragment, useContext, useEffect, useRef } from 'react'
import { MultipleSelectsContext } from 'context/MultipleSelectsContext'
import { type RootState } from 'redux/store'
import { Select } from 'd-system'
import { type TIngr_purchase_places } from 'controllers/sql/ingredients/types'
import { defaultSelectValue } from 'utils/constants'
import randomId from 'utils/randomId'
import { useSelector } from 'react-redux'

const UpdatePurchasePlaces: FC<UpdatePurchasePlacesProps> = ({ purchasePlacesInIngredient }) => {
  const isFirstRender = useRef(true)
  const {
    addSelect,
    data,
    deleteSelect,
    disableButton,
    onChange
  } = useContext(MultipleSelectsContext)
  const purchasePlaces =
    useSelector((state: RootState) => state.purchasePlaces.purchasePlaces)

  useEffect(
    () => {
      if (isFirstRender.current) {
        isFirstRender.current = false
        purchasePlacesInIngredient.forEach((pp) => {
          console.log(pp.purchase_place_id)

          addSelect(`${pp.purchase_place_id}`)
        })
      }
    },
    [purchasePlacesInIngredient]
  )

  return <>
  {data.selects.map((select, selectIndex) => <Fragment key={select.selectId}>
    <Container>
      <Select
        id={select.selectId}
        name={select.selectId}
        label="Selecciona un lugar de compra"
        value={select.value}
        onChange={(ev) => {
          onChange(
            ev.currentTarget.value,
            selectIndex
          )
        }}
      >
        <option value={defaultSelectValue} disabled>{defaultSelectValue}</option>
        {purchasePlaces.map((pp) => <Fragment key={randomId()}>
          <option value={pp.id} disabled={data.valuesUsed
            .some((valueUsed) => valueUsed === `${pp.id}`)}>{pp.name}</option>
          </Fragment>)
        }
      </Select>
      <ButtonDeleteSelect
        data-select-id={select.selectId}
        onClick={() => {
          deleteSelect(
            select.selectId,
            select.value,
            selectIndex
          )
        }}
      />
    </Container>
  </Fragment>)}
  <ButtonAddSelect
    disabled={disableButton}
    text="Añadir lugar de compra"
  />
  </>
}

interface UpdatePurchasePlacesProps {
  purchasePlacesInIngredient: TIngr_purchase_places
}

export default UpdatePurchasePlaces
