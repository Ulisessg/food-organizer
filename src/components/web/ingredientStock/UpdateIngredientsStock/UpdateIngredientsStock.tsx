import { Button, Form, Input, TrashCan, spaceSize } from 'd-system'
import React, { type FC, useContext } from 'react'
import { ModalUpdateData } from 'components/web/common/ModalUpdateData'
import { ModalUpdateDataContext } from 'context/ModalUpdateDataContext'
import { type RootState } from 'redux/store'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import useUpdateIngredientStock from 'hooks/components/ingredientsStock/useUpdateIngredientStock'

const UpdateIngredientsStock: FC = () => {
  const { elementIndex } = useContext(ModalUpdateDataContext)
  const ingredientStockSelected = useSelector((state: RootState) => state
    .ingredientsStock
    .ingredientsStock[Number(elementIndex)])

  const {
    inputsData,
    onChange,
    inputsErrors,
    disableUndoChanges,
    undoChanges,
    disableUpdateIngredientStock,
    updateIngredientStock
  } = useUpdateIngredientStock({
    elementIndex,
    ingredient: ingredientStockSelected
  })

  return <ModalUpdateData>
  <Form formTitle="Actualizar ingrediente disponible">
    <TrashCanContainer>
      <TrashCan
        title="Eliminar ingrediente disponible"
        width={Number(spaceSize) * 4}
        height={Number(spaceSize) * 4}
      />
    </TrashCanContainer>
    <IngredientNameStyles>{ingredientStockSelected?.ingredient}</IngredientNameStyles>
    <IngredientQtyContainer>
      <Input
        id="update_ingredient_stock_qty"
        name="update_ingredient_stock_qty"
        label="Cantidad disponible"
        type="number"
        required
        value={inputsData.update_ingredient_stock_qty}
        onChange={onChange}
        inputInvalid={inputsErrors.update_ingredient_stock_qty}
        acceptanceCriteria="Solo números"
      />
      <p className="update_ingredient_stock_uom">{ingredientStockSelected?.uom}</p>
    </IngredientQtyContainer>
    <Input
      id="update_ingredient_stock_comment"
      name="update_ingredient_stock_comment"
      label="Comentario"
      value={inputsData.update_ingredient_stock_comment}
      onChange={onChange}
      acceptanceCriteria="Opcional"
    />
    <ButtonsContainer>
      <Button
        colorMessage="info"
        size="small"
        text="Deshacer cambios"
        disabled={disableUndoChanges}
        type="button"
        onClick={undoChanges}
      />
      <Button
        colorMessage="continue"
        size="small"
        text="Actualizar"
        type="button"
        disabled={disableUpdateIngredientStock}
        onClick={updateIngredientStock}
      />
    </ButtonsContainer>
  </Form>
</ModalUpdateData>
}

const IngredientNameStyles = styled.p`
  text-transform: uppercase;
  text-align: center;
  font-weight: 500;
  font-size: 24px;
`

const TrashCanContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`
const IngredientQtyContainer = styled.div`
  display: flex;
  align-items: center;
  .update_ingredient_stock_uom {
    margin-top: ${Number(spaceSize) * 2}px;
    margin-left: ${Number(spaceSize) * 2}px;
  }
`

const ButtonsContainer = styled.div`
  margin-top: ${Number(spaceSize) * 3}px;
  display: flex;
  justify-content: space-around;
`

export default UpdateIngredientsStock
