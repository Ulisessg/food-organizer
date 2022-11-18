import React, { FC, Fragment, useState } from 'react'
import { Button } from 'd-system'
import { GetPurchasePlaces } from 'controllers/food_organizer_crud/purchasePlaceCRUD'
import Select from 'components/common/Select'
import randomId from 'utils/randomId'

const PurchasePlaces: FC<Props> = ({
  data
}) => {
  const [
    purchasePlaces,
    setPurchasePlaces
  ] = useState<Array<{ id: string }>>([
    {
      id: randomId()
    }
  ])
  const increasePurchasePlace = (): void => setPurchasePlaces((prev) => [
    ...prev,
    { id: randomId() }
  ])

  return <>
    {purchasePlaces.map(({ id: idKey }) => <Fragment key={idKey}>
          <Select id={`select_purchase_place-${idKey}`} labelText="Selecciona un lugar de compra">
            {data.map(({ id, name }) => <Fragment key={id}>
              <option value={name}>{name}</option>
            </Fragment>)}
          </Select>
        </Fragment>)}

        <Button
          colorMessage="info"
          size="100%"
          text="Añadir lugar de compra"
          type="button"
          style={{ marginBottom: '30px' }}
          onClick={increasePurchasePlace}
        />
</>
}

interface Props {
  data: GetPurchasePlaces
}

export default PurchasePlaces
