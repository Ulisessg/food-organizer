/* eslint-disable max-statements */
/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/naming-convention */
import { Button, Form, Input, LoadingSpinner, Select } from 'd-system'
import React, { type FC, Fragment, useRef } from 'react'
import Details from '../../common/Details'
import ErrorMessage from '../../common/ErrorMessage'
import { LoadingSpinnerContainer } from 'components/web/common/FormInDetailsStyles'
import {
  MultipleSelectsContextProvider
} from 'context/MultipleSelectsContext'
import RequestResultStyles from 'components/web/common/RequestResultStyles'
import { type RootState } from 'redux/store'
import { defaultSelectValue } from 'utils/constants'
import dynamic from 'next/dynamic'
import randomId from 'utils/randomId'
import useCreateIngredient from 'hooks/components/useCreateIngredient/useCreateIngredientWeb'
import { useSelector } from 'react-redux'

const PurchasePlaces = dynamic(
  async () => {
    const Component = await import('./PurchasePlaces')
    return Component
  },
  {
    ssr: false
  }
)

// eslint-disable-next-line max-lines-per-function
const CreateIngredient: FC = () => {
  const formRef = useRef<HTMLFormElement>(null)
  const detailsRef = useRef<HTMLDetailsElement>(null)
  const selectUomElement = useRef<HTMLSelectElement>(null)
  const purchasePlacesData = useSelector((state: RootState) => state.purchasePlaces)
  const unitsOfMeasureData = useSelector((state: RootState) => state.unitsOfMeasure)
  const ingredientsData = useSelector((state: RootState) => state.ingredients)
  const {
    disableButton,
    inputsData,
    inputsErrors,
    onBlur,
    onChange,
    createIngredient,
    ingredientNameIsRepeated
  } = useCreateIngredient(
    detailsRef,
    formRef,
    selectUomElement
  )

  return <>
  <Details summary="Crear ingrediente" ref={detailsRef as any}>
    <Form formTitle="Crear ingrediente" ref={formRef}>
      <Input
        id="ingredient_name"
        inputMode="text"
        label="Nombre del ingrediente"
        name="ingredient_name"
        type="text"
        pattern="^[\p{L}\s]+$"
        acceptanceCriteria="Solo letras y espacios"
        inputInvalid={inputsErrors.ingredient_name || ingredientNameIsRepeated}
        onChange={onChange}
        onBlur={onBlur}
        required
        minLength={2}
        style={{ textTransform: 'capitalize' }}
      />
      <RequestResultStyles
        hidden={!ingredientNameIsRepeated}
        isError={true}
        marginTop="-5px"
      >
        Ese ingrediente ya existe
      </RequestResultStyles>
      {/* Purchase places */}

      {purchasePlacesData.getRequestError && <ErrorMessage
          message="Error obteniendo lugares de compra"
          action="intenta de nuevo mas tarde"
        />
      }
      {purchasePlacesData.dataIsLoading && <LoadingSpinner size="small" />}
      {(!purchasePlacesData.dataIsLoading &&
      !purchasePlacesData.getRequestError) && <PurchasePlaces
            restartMultipleSelects={ingredientsData.postIngredientPurchaseSuccess ||
            ingredientsData.postIngredientPurchaseSuccess}
          />
        }

      {/* Unit Of Measure */}

      {unitsOfMeasureData.dataIsLoading && <LoadingSpinner size="small" />}
      {unitsOfMeasureData.errorGettingData && <ErrorMessage
          message="Error obteniendo unidades de medida"
          action="intenta de nuevo mas tarde"
        />
      }
      {(!unitsOfMeasureData.dataIsLoading && !unitsOfMeasureData.errorGettingData) &&

       <Select
        id="select_uom"
        label="Selecciona una unidad de medida"
        name="ingredient_uom"
        onChange={onChange}
        onBlur={onBlur}
        required
        allowDefaultValue={false}
        defValue={defaultSelectValue}
        value={inputsData.ingredient_uom}
        selectIsInvalid={inputsErrors.ingredient_uom}
        ref={selectUomElement}
      >
          <option
            value={defaultSelectValue}
            disabled
            aria-disabled>-- {defaultSelectValue} --</option>
       {
       unitsOfMeasureData.uomGroupedByType.map(({ uomt_name, uom }) => <Fragment key={randomId()}
          >
          <optgroup label={uomt_name}>
            {uom.map(({ name, id }) => <Fragment key={randomId()}>
              <option value={name} data-uom-id={id}>{name}</option>
            </Fragment>)}
          </optgroup>
       </Fragment>)}
      </Select>
      }
      <Input
        id="ingredient_comment"
        inputMode="text"
        label="Comentario"
        acceptanceCriteria="opcional"
        name="ingredient_comment"
        type="text"
        onChange={onChange}
        value={inputsData.ingredient_comment}
      />
      <Button
        colorMessage="continue"
        size="100%"
        text="Crear ingrediente"
        type="button"
        disabled={disableButton}
        onClick={createIngredient}
      />
      {/* Request init */}
      {(ingredientsData.postIsLoading) &&
      <LoadingSpinnerContainer>
        <LoadingSpinner size="large" />
      </LoadingSpinnerContainer>}

      {/* Request end with error */}
      <RequestResultStyles
          hidden={
            !ingredientsData.postIngredientPurchaseError ||
            !ingredientsData.postIngredientPurchaseError}
          isError={true}
        >
          {ingredientsData.postError && 'Ocurrió un error creando el ingrediente'}
          {ingredientsData.postIngredientPurchaseError &&
          'Ocurrió un error añadiendo los lugares de compra'}
        </RequestResultStyles>

      {/* Request end successfull */}
        <RequestResultStyles
          hidden={!ingredientsData.postSuccess && !ingredientsData.postIngredientPurchaseSuccess}
          isError={false}
        >
          Ingrediente creado con éxito
        </RequestResultStyles>
    </Form>

  </Details>
</>
}

const CreateIngredientWrapper: FC = () => {
  const purchasePlacesLenght = useSelector((state: RootState) => state
    .purchasePlaces.purchasePlaces.length)
  return <MultipleSelectsContextProvider
    idPrefix="purchase_places"
    optionsLenght={purchasePlacesLenght}
  >
   <CreateIngredient />
  </MultipleSelectsContextProvider>
}

export default CreateIngredientWrapper
