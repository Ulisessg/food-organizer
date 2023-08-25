import { Button, Form, Input, Select } from 'd-system'
import React, { type FC, Fragment, useContext } from 'react'
import { ModalUpdateDataContext } from 'context/ModalUpdateDataContext'
import {
  MultipleSelectsContextProvider
} from 'context/MultipleSelectsContext'
import RequestResultStyles from 'components/web/common/RequestResultStyles'
import { type RootState } from 'redux/store'
import SystemImage from 'components/web/common/SystemImage'
import UpdateIngredientPurchasePlaces from './UpdateIngredientPurchasePlaces'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import useUpdateIngredient from 'hooks/components/ingredients/useUpdateIngredient'

const ModalUpdateIngredientsContent: FC<ModalUpdateIngredientsContentProps> =
 ({ ingredient }) => {
   const { elementIndex: ingredientIndex } = useContext(ModalUpdateDataContext)
   const {
     inputsData,
     onChange,
     formHasChanged,
     onClickSelectImage,
     formIsValid,
     inputsInitialValues,
     restartForm,
     checkFormValidity,
     updateIngredient
   } = useUpdateIngredient({
     ingredient,
     ingredientIndex,
     purchasePlacesInIngredient: ingredient.ingr_purchase_places
   })
   const {
     updateIngredientIsLoading,
     updateIngredientSuccess,
     updateIngredientError
   } = useSelector((state: RootState) => state.ingredients)

   const unitsOfMeasure = useSelector((state: RootState) => state.unitsOfMeasure.uom)
   return <Form formTitle="Actualizar ingrediente">
  <Input
    id="update_ingredient_name"
    name="update_ingredient_name"
    label="Nombre"
    value={inputsData.update_ingredient_name}
    pattern="^[\p{L}\s]+$"
    onChange={onChange}
  />

  <UpdateIngredientPurchasePlaces
    purchasePlacesInIngredient={ingredient.ingr_purchase_places}
    checkFormValidity={checkFormValidity}
  />

  <Select
    id="update_ingredient_uom"
    name="update_ingredient_uom"
    label="Unidad de medida"
    value={inputsData.update_ingredient_uom}
    onChange={onChange}
  >
    {unitsOfMeasure.map((unitOfMeasure) => <Fragment key={unitOfMeasure.id}>
      <option value={unitOfMeasure.id}>{unitOfMeasure.name}</option>
    </Fragment>)}
  </Select>
  <Input
    id="update_ingredient_image"
    name="update_ingredient_image"
    label="Imagen"
    type="image"
    onClick={onClickSelectImage}
  />
  <SystemImage
    table="ingredients"
    imageIsInTemporal={inputsData.update_ingredient_image !==
      inputsInitialValues.get('update_ingredient_image') as string}
    fileName={inputsData.update_ingredient_image}
    alt="Sin imagen" />
  <Input
    id="update_ingredient_comment"
    name="update_ingredient_comment"
    label="Comentario"
    value={inputsData.update_ingredient_comment}
    onChange={onChange}
  />
  <FormButtonsContainer>
    <Button
      colorMessage="cancel"
      size="small"
      text="Deshacer cambios"
      type="button"
      disabled={!formHasChanged ||
        updateIngredientSuccess ||
        updateIngredientIsLoading}
      onClick={restartForm}
    />
    <Button
      colorMessage="continue"
      size="small"
      text={'Actualizar'}
      type="button"
      disabled={
        !formHasChanged ||
        !formIsValid ||
        updateIngredientSuccess ||
        updateIngredientIsLoading}
      onClick={updateIngredient}
    />
  </FormButtonsContainer>
  <RequestResultStyles
    hidden={!updateIngredientError}
    isError={true}
  >Ocurrio un error actualizando el ingrediente</RequestResultStyles>
  <RequestResultStyles
    hidden={!updateIngredientSuccess}
    isError={false}
  >Ingrediente actualizado</RequestResultStyles>
</Form>
 }

const ContentWrapper: FC = () => {
  const { elementIndex } = useContext(ModalUpdateDataContext)
  const ingredient = useSelector((state: RootState) => state
    .ingredients.ingredients[Number(elementIndex)])

  const purchasePlacesLength =
    useSelector((state: RootState) => state.purchasePlaces.purchasePlaces.length)

  return <MultipleSelectsContextProvider optionsLenght={purchasePlacesLength}>
    <ModalUpdateIngredientsContent ingredient={ingredient} />
  </MultipleSelectsContextProvider>
}

const FormButtonsContainer = styled.div`
margin-top: 24px;
  display: flex;
  justify-content: space-around;
`

interface ModalUpdateIngredientsContentProps {
  ingredient: RootState['ingredients']['ingredients'][0]
}

export default ContentWrapper
