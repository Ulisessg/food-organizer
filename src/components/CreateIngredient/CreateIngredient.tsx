import { Button, FileInput, Form, LoadingSpinner, TextInput } from 'd-system'
import React, { FC, useContext } from 'react'
import Details from '../common/Details'
import ErrorMessage from '../common/ErrorMessage'
import { IngredientsContext } from 'context/ingredientsContext'
import PurchasePlaces from './PurchasePlaces'
import UnitsOfMeasure from './UnitsOfMeasure'

// eslint-disable-next-line max-lines-per-function
const CreateIngredient: FC = () => {
  const ingredientsContext = useContext(IngredientsContext)

  return <>
  <Details summary="Crear ingrediente">
    <Form formTitle="Crear ingrediente">
      <TextInput
        id="ingredient_name"
        inputMode="text"
        label="Nombre del ingrediente"
        name="ingredient_name"
        placeholder="Arroz, azucar, leche..."
        type="text"
      />

      {/* Purchase places */}

      {ingredientsContext.errorGettingPurchasePlaces && <ErrorMessage
          message="Error obteniendo lugares de compra"
          action="intenta de nuevo mas tarde"
        />
      }
      {ingredientsContext.purchasePlacesIsLoading && <LoadingSpinner size="small" />}
      {(!ingredientsContext.purchasePlacesIsLoading &&
      !ingredientsContext.errorGettingPurchasePlaces) && <PurchasePlaces
        data={ingredientsContext.purchasePlaces}
        initialSelectId="143123" /> }

      {/* Units Of Measure */}

      {ingredientsContext.uomIsLoading && <LoadingSpinner size="small" />}
      {ingredientsContext.errorGettingUom && <ErrorMessage
          message="Error obteniendo unidades de medida"
          action="intenta de nuevo mas tarde"
        />
      }
      {(!ingredientsContext.uomIsLoading && !ingredientsContext.errorGettingUom) &&
       <UnitsOfMeasure data={ingredientsContext.unitsOfMeasure} />}
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
