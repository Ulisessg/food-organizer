/* eslint-disable max-lines-per-function */
import { Button, Form, Input, LoadingSpinner } from 'd-system'
import React, { type FC, useRef } from 'react'
import Details from '../common/Details'
import { LoadingSpinnerContainer } from '../common/FormInDetailsStyles'
import RequestResultStyles from '../common/RequestResultStyles'
import { type RootState } from 'redux/store'
import useCreateFoodType from 'hooks/components/foods/useCreateFoodType'
import { useSelector } from 'react-redux'

const CreateFoodType: FC = () => {
  const foodsData = useSelector((state: RootState) => state.foods)
  const formRef = useRef<HTMLFormElement>(null)
  const detailsRef = useRef<HTMLDetailsElement>(null)
  const {
    createFoodType,
    disableButton,
    foodTypeIsRepeated,
    inputsData,
    inputsErrors,
    onBlur,
    onChange
  } = useCreateFoodType(
    formRef,
    detailsRef
  )
  return (
    <Details summary="Crear tipo de comida" ref={detailsRef as any}>
      <Form formTitle="Tipo de comida" ref={formRef}>
        <Input
          id="food_type_name"
          inputMode="text"
          label="Nombre del tipo de comida"
          name="food_type_name"
          type="text"
          pattern="^[\p{L}\s]+$"
          acceptanceCriteria="Solo letras y espacios"
          required
          onBlur={onBlur}
          onChange={onChange}
          inputInvalid={inputsErrors.food_type_name}
          value={inputsData.food_type_name}
          minLength={2}
          style={{ textTransform: 'capitalize' }}
        />

        <RequestResultStyles
          isError={true}
          hidden={!foodTypeIsRepeated}
          marginTop="-20px"
        >
          Ese tipo de comida ya existe
        </RequestResultStyles>

        <Button
          colorMessage="continue"
          size="100%"
          text="Crear tipo de comida"
          type="button"
          disabled={disableButton}
          onClick={createFoodType}
        />
        {foodsData.getFoodTypesIsLoading && <LoadingSpinnerContainer>
          <LoadingSpinner size="large" />
        </LoadingSpinnerContainer>}
        {foodsData.postFoodTypesIsLoading && <LoadingSpinnerContainer>
          <LoadingSpinner size="large" />
        </LoadingSpinnerContainer>}
        <RequestResultStyles
          isError={true}
          hidden={!foodsData.getFoodTypesError}
        >
          Ocurrió un error obteniendo los tipos de comida
        </RequestResultStyles>

        <RequestResultStyles
          isError={true}
          hidden={!foodsData.postFoodTypesError}
        >
          Ocurrió un error creando el tipo de comida
        </RequestResultStyles>

        <RequestResultStyles
          isError={false}
          hidden={!foodsData.postFoodTypesSuccess}
        >
          Tipo de comida creado exitosamente
        </RequestResultStyles>
      </Form>
    </Details>
  )
}

export default CreateFoodType
