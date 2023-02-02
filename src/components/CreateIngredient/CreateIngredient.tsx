/* eslint-disable max-statements */
/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/naming-convention */
import { Button, Form, Input, LoadingSpinner, Select } from 'd-system'
import React, { type FC, Fragment, useContext, useRef } from 'react'
import Details from '../common/Details'
import ErrorMessage from '../common/ErrorMessage'
import { IngredientsContext } from 'context/ingredientsContext'
import { LoadingSpinnerContainer } from 'components/common/FormInDetailsStyles'
import RequestResultStyles from 'components/common/RequestResultStyles'
import { defaultSelectValue } from 'utils/constants'
import randomId from 'utils/randomId'
import useCreateIngredient from 'hooks/components/useCreateIngredient'

// eslint-disable-next-line max-lines-per-function
const CreateIngredient: FC = () => {
  const ingredientsContext = useContext(IngredientsContext)
  const formRef = useRef<HTMLFormElement>(null)
  const detailsRef = useRef<HTMLDetailsElement>(null)
  const {
    disableButton,
    errorResponse,
    inputsData,
    inputsErrors,
    onBlur,
    onChange,
    PurchasePlaces,
    nameIsRepeated,
    sendIngredient,
    requestEnd,
    requestError,
    requestInit
  } = useCreateIngredient(
    detailsRef,
    formRef
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
        inputInvalid={inputsErrors.ingredient_name || nameIsRepeated}
        onChange={onChange}
        onBlur={onBlur}
        required
        minLength={2}
        style={{ textTransform: 'capitalize' }}
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
        addSelectButtonText="Añadir lugar de compra"
        label="Selecciona un lugar de compra"
        optionValueKeyName="name"
        options={ingredientsContext.purchasePlaces}
      />}

      {/* Unit Of Measure */}

      {ingredientsContext.uomIsLoading && <LoadingSpinner size="small" />}
      {ingredientsContext.errorGettingUom && <ErrorMessage
          message="Error obteniendo unidades de medida"
          action="intenta de nuevo mas tarde"
        />
      }
      {(!ingredientsContext.uomIsLoading && !ingredientsContext.errorGettingUom) &&

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
      >
          <option
            value={defaultSelectValue}
            disabled
            aria-disabled>-- {defaultSelectValue} --</option>
       {
       ingredientsContext.unitsOfMeasure.map(({ uomt_name, uom }) => <Fragment key={randomId()}
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
      />
      <Button
        colorMessage="continue"
        size="100%"
        text="Crear ingrediente"
        type="button"
        disabled={disableButton}
        onClick={sendIngredient}
      />
      <RequestResultStyles
        hidden={!nameIsRepeated}
        isError={true}
      >
        Ese ingrediente ya existe
      </RequestResultStyles>
      {/* Request init */}
      {(requestInit && !requestEnd) &&
      <LoadingSpinnerContainer>
        <LoadingSpinner size="large" />
      </LoadingSpinnerContainer>}
      {/* Request end */}
      <RequestResultStyles
          hidden={!requestEnd && !requestError}
          isError={true}
        >
          {errorResponse}
        </RequestResultStyles>

        <RequestResultStyles
          hidden={requestError && !requestEnd}
          isError={false}
        >
          Ingrediente creado con éxito
        </RequestResultStyles>
    </Form>

  </Details>
</>
}

export default CreateIngredient
