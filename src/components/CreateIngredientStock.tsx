/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/naming-convention */
import { Button, Datalist, Form, Input, LoadingSpinner } from 'd-system'
import React, { type FC, Fragment, useRef } from 'react'
import Details from './common/Details'
import ErrorMessage from './common/ErrorMessage'
import type { GetIngredients } from 'controllers/food_organizer_crud/ingredientCRUD'
import styled from 'styled-components'
import useCreateIngredientStock from 'hooks/components/useCreateIngredientStock'
import useGetRequest from 'hooks/useGetRequest'

// eslint-disable-next-line max-lines-per-function
const CreateIngredientStock: FC = () => {
  const formRef = useRef(null)
  const { data, error, isLoading } = useGetRequest('/api/ingredient')
  const ingredients = data as GetIngredients

  const {
    inputsData,
    onChange,
    onBlur,
    uom,
    inputsErrors,
    disableButton,
    sendIngredientStock
  } = useCreateIngredientStock(formRef)

  return <>
  <Details summary="Añadir ingrediente disponible">
      <Form formTitle="Informacion del ingrediente" ref={formRef}>
        {isLoading && <LoadingSpinner size="large" />}
        {error && <ErrorMessage
          message="Error obteniendo ingredientes"
          action="intenta de nuevo mas tarde" />}

        {(!error && !isLoading) && <Datalist
          id="ingredient_stock_ingredients"
          label="Escribe el nombre del ingrediente"
          name="ingredient"
          inputProps={{
            inputInvalid: inputsErrors.ingredient,
            minLength: 1,
            onBlur,
            onChange,
            required: true,
            value: inputsData.ingredient
          }}
        >
          {ingredients.map(({
            ingredient_id,
            ingredient_name,
            uom_name
          }) => <Fragment key={ingredient_id}>
            <option
              data-ingredient-uom={uom_name}
              data-ingredient-id={ingredient_id}
              value={ingredient_name}
            >{ingredient_name}</option>
          </Fragment>)}
        </Datalist>}
        <IngredientInputContainer>
          <Input
            id="ingredient_stock_qty"
            inputMode="numeric"
            label="Cantidad del ingrediente"
            name="ingredient_qty"
            type="number"
            min={1}
            // OnChange event doesnt work any time with inputs type number
            onInput={onChange as any}
            required
            onChange={onChange}
            onBlur={onBlur}
            value={inputsData.ingredient_qty}
            inputInvalid={inputsErrors.ingredient_qty}
          />
          <IngredientUom>{uom}</IngredientUom>
        </IngredientInputContainer>
        <Input
          id="ingredient_stock_comment"
          label="Commentarios"
          name="ingredient_stock_comment"
          acceptanceCriteria="Opcional"
          type="text"
          value={inputsData.ingredient_stock_comment}
          onChange={onChange}
        />
        <Button
          colorMessage="continue"
          size="100%"
          text="Añadir ingrediente"
          type="button"
          disabled={disableButton}
          onClick={sendIngredientStock}
        />
      </Form>
    </Details>
</>
}

const IngredientInputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  & > label {
    width: 85%;
    margin-right: 10px;
  }
`

const IngredientUom = styled.p`
  text-transform: capitalize;
`

export default CreateIngredientStock
