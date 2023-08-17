import { Form, Input, Select } from 'd-system'
import React, { type FC, Fragment, useContext } from 'react'
import { ModalUpdateDataContext } from 'context/ModalUpdateDataContext'
import {
  MultipleSelectsContextProvider
} from 'context/MultipleSelectsContext'
import { type RootState } from 'redux/store'
import SystemImage from 'components/web/common/SystemImage'
import UpdateIngredientPurchasePlaces from './UpdateIngredientPurchasePlaces'
import { useSelector } from 'react-redux'
import useUpdateIngredient from 'hooks/components/ingredients/useUpdateIngredient'

const ModalUpdateIngredientsContent: FC<ModalUpdateIngredientsContentProps> =
 ({ ingredient }) => {
   const { inputsData, onChange, formHasChanged, onClickSelectImage } = useUpdateIngredient({
     ingredient,
     purchasePlacesInIngredient: ingredient.ingr_purchase_places
   })
   console.log(formHasChanged)

   const unitsOfMeasure = useSelector((state: RootState) => state.unitsOfMeasure.uom)
   return <Form formTitle="Actualizar ingrediente">
  <Input
    id="update_ingredient_name"
    name="update_ingredient_name"
    label="Nombre"
    value={inputsData.update_ingredient_name}
    onChange={onChange}
  />

  <UpdateIngredientPurchasePlaces
    purchasePlacesInIngredient={ingredient.ingr_purchase_places}
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
    type="file"
    onClick={onClickSelectImage}
  />
  <SystemImage
    table="ingredients"
    imageIsInTemporal={false}
    fileName={ingredient.image as string}
    alt="Sin imagen" />
  <Input
    id="update_ingredient_comment"
    name="update_ingredient_comment"
    label="Comentario"
    value={inputsData.update_ingredient_comment}
    onChange={onChange}
  />
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

interface ModalUpdateIngredientsContentProps {
  ingredient: RootState['ingredients']['ingredients'][0]
}

export default ContentWrapper
