/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/naming-convention */
import { Button, Datalist, Form, Input, LoadingSpinner } from 'd-system'
import React, { type FC, Fragment, useRef } from 'react'
import Details from '../common/Details'
import ErrorMessage from '../common/ErrorMessage'
import { LoadingSpinnerContainer } from '../common/FormInDetailsStyles'
import RequestResultStyles from '../common/RequestResultStyles'
import { type RootState } from 'redux/store'
import styled from 'styled-components'
import useCreateIngredientStock from 'hooks/components/useCreateIngredientStock'
import { useSelector } from 'react-redux'

// eslint-disable-next-line max-lines-per-function
const CreateIngredientStock: FC = () => {
  const formRef = useRef<HTMLFormElement>(null)
  const detailsRef = useRef<HTMLDetailsElement>(null)
  const ingredientsStockData = useSelector((state: RootState) => state.ingredientsStock)
  const ingredientsData = useSelector((state: RootState) => state.ingredients)
  const {
    inputsData,
    onChange,
    onBlur,
    uom,
    inputsErrors,
    isRepeated,
    disableButton,
    createIngredientStock
  } = useCreateIngredientStock(
    formRef,
    detailsRef
  )

  return <>
  <Details summary="Añadir ingrediente disponible" ref={detailsRef as any}>
      <Form formTitle="Informacion del ingrediente" ref={formRef}>
        {ingredientsStockData.getRequestIsLoading && <LoadingSpinner size="large" />}
        {ingredientsStockData.getRequestError && <ErrorMessage
          message="Error obteniendo ingredientes"
          action="intenta de nuevo mas tarde" />}

        {(ingredientsStockData.getRequestSuccess) && <Datalist
          id="ingredient_stock_ingredients"
          label="Escribe el nombre del ingrediente"
          name="ingredient"
          inputProps={{
            autoComplete: 'true',
            inputInvalid: inputsErrors.ingredient || isRepeated,
            minLength: 1,
            onBlur,
            onChange,
            required: true,
            style: { textTransform: 'capitalize' },
            value: inputsData.ingredient
          }}
        >
          {ingredientsData.ingredients.map(({
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
        <RequestResultStyles
          isError={true}
          hidden={!isRepeated}
          marginTop="-20px">
            Ya registraste ese ingrediente como disponible!
        </RequestResultStyles>
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
          // eslint-disable-next-line no-ternary
          colorMessage="continue"
          size="100%"
          text="Añadir ingrediente"
          type="button"
          disabled={disableButton}
          onClick={createIngredientStock}
        />
        {ingredientsStockData.postRequestIsLoading &&
          <LoadingSpinnerContainer>
            <LoadingSpinner size="large" />
          </LoadingSpinnerContainer>}
        <RequestResultStyles
          isError={true}
          hidden={!ingredientsStockData.postRequestError}>
            Ocurrió un error registrando el ingrediente disponible
        </RequestResultStyles>
        <RequestResultStyles
          isError={false}
          hidden={!ingredientsStockData.postRequestSuccess}>
            Ingrediente disponible añadido!
        </RequestResultStyles>
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
