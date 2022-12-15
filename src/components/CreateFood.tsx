/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable sort-imports */
import Details from './common/Details'
import styled from 'styled-components'
import React, { ChangeEvent, FC, Fragment, useState } from 'react'
import { Button, FileInput, Form, LoadingSpinner, TextInput } from 'd-system'
import Select from './common/Select'
import useGetRequest from 'hooks/useGetRequest'
import ErrorMessage from './common/ErrorMessage'
import type { GetFoodTypes } from 'controllers/food_organizer_crud/foodTypesCRUD'
import { defaultSelectValue } from 'utils/constants'
import { GetIngredients } from 'controllers/food_organizer_crud/ingredientCRUD'
import { Container, ButtonDeleteSelect, ButtonAddSelect } from './common/MultipleSelects'
import useMultipleSelects from 'hooks/useMultipleSelects'

// eslint-disable-next-line max-lines-per-function
const CreateFood: FC = () => {
  const { data, error, isLoading } = useGetRequest<GetFoodTypes>('/api/foodtypes')
  const {
    data: ingredientRequestData,
    error: ingredientRequestError,
    isLoading: ingredientIsLoading
  } = useGetRequest<GetIngredients>('/api/ingredient')

  const {
    addSelect: addIngredient,
    data: selectsData,
    deleteSelect: deleteIngredient,
    onChange: handleIngredientsSelectChange
  } = useMultipleSelects()
  const [
    foodTypeSelected,
    setFoodTypeSelected
  ] = useState<string>(defaultSelectValue)

  const foodTypes = data as GetFoodTypes
  const ingredients = ingredientRequestData as GetIngredients

  const handleFoodTypeSelect = ({ currentTarget }:
  ChangeEvent<HTMLSelectElement>): void => setFoodTypeSelected(currentTarget.value)
  return <>
  <Details summary="Crear comida">
    <Form formTitle="Crear comida">
      <TextInput
        id="food_name"
        inputMode="text"
        label="Nombre de la comida"
        name="food_name"
        placeholder="Mole, agua de sandia, sopa de fideos"
        type="text"
      />
      <PrepTimeContainer>
        <TextInput
          id="food_prep_time"
          inputMode="numeric"
          label="Tiempo de preparación (opcional)"
          name="food_prep_time"
          placeholder="30"
          type="text"
        />
        <p>minutos</p>
      </PrepTimeContainer>
      {isLoading && <LoadingSpinner size="large" />}
      {error && <ErrorMessage
        message={data as string}
        action="intenta de nuevo en unos momentos" />}

      {(!error && !isLoading) && <>
        <Select
          id="food_types"
          labelText="Selecciona el tipo de comida al que pertenece"
          value={foodTypeSelected}
          onChange={handleFoodTypeSelect}
          >
          {foodTypes.map(({ id, name }) => <Fragment key={id}>
            <option value={name}>{name}</option>
          </Fragment>)}
        </Select>
      </>
      }

      {/* Ingredients */}
      {ingredientIsLoading && <LoadingSpinner size="large" />}
      {ingredientRequestError &&
        <ErrorMessage message={ingredientRequestData as string}
          action="intenta de nuevo más tarde" />}

      {(!ingredientRequestError && !ingredientIsLoading) && <>
      <FormIngredientsSectionTitle>Ingredientes</FormIngredientsSectionTitle>
        {selectsData.selects.map(({ selectId }, index) => <Fragment
        key={selectId}>
          {index === 0 && <Select
            id={selectId}
            labelText="Selecciona un ingrediente"
            value={selectsData.selectsValues[index].value}
            onChange={handleIngredientsSelectChange}
            >
            {ingredients.map(({ ingredient_id, ingredient_name }) => <option
              value={ingredient_name}
              key={ingredient_id}
              disabled={
typeof selectsData.valuesUsed.find((valUsed) => valUsed === ingredient_name) !== 'undefined'
              }
              >
              {ingredient_name}
            </option>)}
        </Select>}

        {index !== 0 && <Container>
          <Select
            id={selectId}
            labelText="Selecciona un ingrediente"
            key={selectId}
            value={selectsData.selectsValues[index].value}
            onChange={handleIngredientsSelectChange}
            >
            {ingredients.map(({ ingredient_id, ingredient_name }) => <option
              value={ingredient_name}
              key={ingredient_id}
              disabled={
typeof selectsData.valuesUsed.find((valUsed) => valUsed === ingredient_name) !== 'undefined'
              }
              >
              {ingredient_name}
            </option>)}
            </Select>
            <ButtonDeleteSelect data-select-id={selectId} onClick={deleteIngredient} />
          </Container>}

        </Fragment>)}
        <ButtonAddSelect
          text="Agregar ingrediente"
          onClick={addIngredient}
          disabled={selectsData.selects.length === ingredients.length}
        />
      </>}

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
        text="Añadir comida"
        type="button"
      />
    </Form>
  </Details>
</>
}

const PrepTimeContainer = styled.div`
  display: flex;
  align-items: center;
  & > label {
    margin-right: 15px;
  }
`

const FormIngredientsSectionTitle = styled.p`
  font-weight: bold;
  text-align: center;
  font-size: 25px;
  margin: 20px 0px;
`

export default CreateFood
