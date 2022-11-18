import { Button, FileInput, Form, LoadingSpinner, TextInput } from 'd-system'
import React, { FC } from 'react'
import Details from '../common/Details'
import ErrorMessage from '../common/ErrorMessage'
import { GetPurchasePlaces } from 'controllers/food_organizer_crud/purchasePlaceCRUD'
import { GetUOM } from 'controllers/food_organizer_crud/unitsOfMeasureCRUD'
import PurchasePlaces from './PurchasePlaces'
import UnitsOfMeasure from './UnitsOfMeasure'
import useGetRequest from 'hooks/useGetRequest'

// eslint-disable-next-line max-lines-per-function
const CreateIngredient: FC = () => {
  const { data, error, isLoading } = useGetRequest<GetPurchasePlaces>('/api/purchase')
  const { data: uomData, error: uomError, isLoading: uomIsLoading } = useGetRequest('/api/uom')

  return <>
  <Details summary="Crear ingrediente">
    <Form title="Crear ingrediente">
      <TextInput
        id="ingredient_name"
        inputMode="text"
        label="Nombre del ingrediente"
        name="ingredient_name"
        placeholder="Arroz, azucar, leche..."
        type="text"
      />

      {/* Purchase places */}

      {error && <ErrorMessage
          message="Error obteniendo lugares de compra"
          action="intenta de nuevo mas tarde"
        />
      }
      {isLoading && <LoadingSpinner size="small" />}
      {(!isLoading && !error) && <PurchasePlaces data={data as GetPurchasePlaces} /> }

      {/* Units Of Measure */}

      {uomIsLoading && <LoadingSpinner size="small" />}
      {uomError && <ErrorMessage
          message="Error obteniendo unidades de medida"
          action="intenta de nuevo mas tarde"
        />
      }
      {(!uomIsLoading && !uomError) && <UnitsOfMeasure data={uomData as GetUOM} />}
      <TextInput
        id="ingredient_comment"
        inputMode="text"
        label="Comentario (opcional)"
        name="ingredient_comment"
        placeholder="Naturales, sin sal, añejo..."
        type="text"
      />
      <FileInput
        accept="image/*"
        id="ingredient_image"
        inputMode="numeric"
        label="Imagen (opcional)"
        name="ingredient_image"
        placeholder="Tomate.png"
        type="file"
      />
      <Button
        colorMessage="continue"
        size="100%"
        text="Crear ingrediente"
        type="button"
      />
    </Form>

  </Details>
</>
}

export default CreateIngredient
