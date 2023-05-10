/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable sort-imports */
import Details from '../common/Details'
import React, { type FC, Fragment, useRef } from 'react'
import { Button, Form, LoadingSpinner, Input, Select } from 'd-system'
import ErrorMessage from '../common/ErrorMessage'
import { defaultSelectValue } from 'utils/constants'
import { useSelector } from 'react-redux'
import { type RootState } from 'redux/store'
import useCreateFood from 'hooks/components/useCreateFood'
import RequestResultStyles from '../common/RequestResultStyles'
import { LoadingSpinnerContainer } from '../common/FormInDetailsStyles'
import { PrepTimeContainer } from './CreateFoodStyles'
import SelectIngredients from './SelectIngredients'

// eslint-disable-next-line max-lines-per-function
const CreateFood: FC = () => {
  const foodsData = useSelector((state: RootState) => state.foods)
  const ingredientsData = useSelector((state: RootState) => state.ingredients)
  const formRef = useRef<HTMLFormElement>(null)
  const {
    createFood,
    disableButton,
    foodNameIsRepeated,
    inputsData,
    onChange,
    onBlur,
    UseMultipleSelectsOnChange,
    addSelect,
    deleteSelect,
    disableAddIngredient,
    selectIngredientsData,
    inputsErrors
  } = useCreateFood(formRef)
  return <>
  <Details summary="Crear comida">
    <Form formTitle="Crear comida" ref={formRef}>
      <Input
        id="food_name"
        inputMode="text"
        label="Nombre de la comida"
        name="food_name"
        type="text"
        acceptanceCriteria="Solo letras y espacios"
        pattern="^[\p{L}\s]+$"
        required
        value={inputsData.food_name}
        onChange={onChange}
        onBlur={onBlur}
        inputInvalid={inputsErrors.food_name || foodNameIsRepeated}
        style={{ textTransform: 'capitalize' }}
      />
      <RequestResultStyles
        isError={true}
        hidden={!foodNameIsRepeated}
        marginTop="-5px"
      >
        Esa comida ya existe
      </RequestResultStyles>
      <PrepTimeContainer>
        <Input
          id="food_prep_time"
          inputMode="numeric"
          label="Tiempo de preparación"
          acceptanceCriteria="Opcional"
          name="food_prep_time"
          type="number"
          value={inputsData.food_prep_time}
          onChange={onChange}
          onBlur={onBlur}
          inputInvalid={inputsErrors.food_prep_time}
          min={1}
        />
        <p>minutos</p>
      </PrepTimeContainer>
      {/* Food type */}
      {foodsData.getFoodTypesIsLoading && <LoadingSpinner size="large" />}
      {foodsData.getFoodTypesError && <ErrorMessage
        message="Ocurrió un error obteniendo los tipos de comida"
        action="intenta de nuevo en unos momentos" />}

      {foodsData.getFoodTypesSuccess && <>
        <Select
          id="food_type_select"
          label="Selecciona un tipo de comida al que pertenece"
          name="food_type_select"
          required
          allowDefaultValue={false}
          defValue={defaultSelectValue}
          value={inputsData.food_type_select}
          onChange={onChange}
          onBlur={onBlur}
          selectIsInvalid={inputsErrors.food_type_select}
          >
            <option value={defaultSelectValue} disabled>{defaultSelectValue}</option>
          {foodsData.foodTypes.map(({ id, name }) => <Fragment key={id}>
            <option value={name}>{name}</option>
          </Fragment>)}
        </Select>
      </>
      }

      {/* Ingredients */}
      {ingredientsData.getIsLoading && <LoadingSpinner size="large" />}
      {ingredientsData.getIngredientsError &&
        <ErrorMessage message="Ocurrió un error obteniendo los ingredientes"
          action="intenta de nuevo más tarde" />}

      {ingredientsData.getIngredientsSuccess && <>
        <SelectIngredients
          addSelect={addSelect}
          data={selectIngredientsData}
          deleteSelect={deleteSelect}
          disableButton={disableAddIngredient}
          onChange={UseMultipleSelectsOnChange}
          />
        </>}
      <Button
        colorMessage="continue"
        size="100%"
        text="Añadir comida"
        type="button"
        disabled={disableButton}
        onClick={createFood}
      />
      {foodsData.postFoodsIsLoading && <LoadingSpinnerContainer>
        <LoadingSpinner size="large" />
        </LoadingSpinnerContainer>}
      <RequestResultStyles
        hidden={!foodsData.postFoodsError}
        isError={true}>
        Ocurrió un error creando la comida
      </RequestResultStyles>
      <RequestResultStyles
        hidden={!foodsData.postFoodsSuccess}
        isError={false}>
        Comida creada con éxito
      </RequestResultStyles>
    </Form>
  </Details>
</>
}

export default CreateFood
