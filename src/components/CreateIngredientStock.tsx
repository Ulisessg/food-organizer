/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/naming-convention */
import { Button, Form, LoadingSpinner, TextInput } from 'd-system'
import React, { type ChangeEvent, type FC, Fragment, useState } from 'react'
import Details from './common/Details'
import ErrorMessage from './common/ErrorMessage'
import type { GetIngredients } from 'controllers/food_organizer_crud/ingredientCRUD'
import Select from './common/Select'
import styled from 'styled-components'
import useGetRequest from 'hooks/useGetRequest'

// eslint-disable-next-line max-lines-per-function
const CreateIngredientStock: FC = () => {
  const [
    ingredientSelected,
    setIngredientSelected
  ] = useState<{
    name: string
    uom: string
  }>({
    name: 'Selecciona una opcion',
    uom: 'N/A'
  })
  const { data, error, isLoading } = useGetRequest('/api/ingredient')
  const ingredients = data as GetIngredients
  const handleIngredientSelected = (ev: ChangeEvent<HTMLSelectElement>): void => {
    const value = ev.currentTarget.value as unknown as string
    const uom: string = document
      .querySelector(`option[value='${value}']`)
      ?.getAttribute('data-ingredient-uom') as unknown as string

    setIngredientSelected({
      name: value,
      uom
    })
  }

  return <>
  <Details summary="Añadir ingrediente disponible">
      <Form formTitle="Informacion del ingrediente">
        {isLoading && <LoadingSpinner size="large" />}
        {error && <ErrorMessage
          message="Error obteniendo ingredientes"
          action="intenta de nuevo mas tarde" />}

        {(!error && !isLoading) && <Select
          id="ingredient_stock_ingredients"
          labelText="Ingredientes"
          value={ingredientSelected.name}
          onChange={handleIngredientSelected}
        >
          {ingredients.map(({
            ingredient_id,
            ingredient_name,
            uom_name
          }) => <Fragment key={ingredient_id}>
            <option
            data-ingredient-uom={uom_name}
            value={ingredient_name}>{ingredient_name}</option>
          </Fragment>)}
        </Select>}
        <IngredientInputContainer>
          <TextInput
            id="ingredient_stock_qty"
            inputMode="numeric"
            label="Cantidad del ingrediente"
            name="ingredient_stock_qty"
            placeholder="0"
            type="text"
          />
          <IngredientUom>{ingredientSelected.uom}</IngredientUom>
        </IngredientInputContainer>
        <Button
          colorMessage="continue"
          size="100%"
          text="Añadir ingrediente"
          type="button"
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
