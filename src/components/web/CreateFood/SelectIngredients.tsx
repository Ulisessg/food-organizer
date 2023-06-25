/* eslint-disable max-lines-per-function */
import { ButtonAddSelect, ButtonDeleteSelect } from 'components/web/common/MultipleSelects'
import { Input, useInputs } from 'd-system'
import React, { type ChangeEvent, type FC, Fragment, useState } from 'react'
import { type RootState } from 'redux/store'
import { type UseMultipleSelectsReturn } from 'hooks/context/useMultipleSelectsContext'
import randomId from 'utils/randomId'
import safeObjectGet from 'utils/safeObjectGet'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

const SelectIngredients: FC<SelectIngredientsComponentProps> =
({
  addSelect, data, deleteSelect, disableButton,
  onChange
}) => {
  const ingredients = useSelector((state: RootState) => state.ingredients.ingredients)
  return <Container>
  <SectionTitle>Selecciona los ingredientes</SectionTitle>
  {data.selects.map((sel) => <SelectionArea key={sel.selectId} data-ingredient-container="true">
    <IngredientComponent selectId={sel.selectId}
      deleteSelect={deleteSelect} onChange={onChange}
    />
  </SelectionArea>)}
  <datalist id="ingredients-options">
    {ingredients.map((ingr, index) => <Fragment key={`${ingr.ingredient_id}_${randomId()}`}>
      <Option opt={{
        ...ingr,
        key: `${ingr.ingredient_id}_${index}`
      }} />
    </Fragment>)}
   </datalist>
  <ButtonAddSelect
    disabled={disableButton}
    text="Añadir ingrediente" onClick={addSelect} />
</Container>
}
interface SelectIngredientsComponentProps {
  data: UseMultipleSelectsReturn['data']
  deleteSelect: UseMultipleSelectsReturn['deleteSelect']
  onChange: OnChangeProp
  disableButton: UseMultipleSelectsReturn['disableButton']
  addSelect: UseMultipleSelectsReturn['addSelect']
}

const IngredientComponent: FC<IngredientComponentProps> = ({
  selectId,
  deleteSelect,
  onChange: OnChangeProps
}) => {
  const [
    unitOM,
    setUnitOM
  ] = useState<string | 'N/A'>('N/A')
  const inputNameIngredientName = selectId
  const inputNameQty = `ingr_qty-${selectId}`
  const { inputsData, inputsErrors, onBlur, onChange: UseInputsOnChange } = useInputs(
    {
      [inputNameIngredientName]: '',
      [inputNameQty]: ''
    },
    true
  )
  const onChange = (ev: ChangeEvent<HTMLInputElement>): void => {
    UseInputsOnChange(ev)
    OnChangeProps(
      ev,
      inputNameIngredientName
    )
    if (ev.currentTarget.name === inputNameIngredientName) {
      const optionSelected: HTMLOptionElement |
      null = document.querySelector(`option[value='${ev.target.value}' i]`)

      if (optionSelected === null) {
        setUnitOM('N/A')
      } else {
        setUnitOM(optionSelected.getAttribute('data-uom') as string)
      }
    }
  }
  return <>
  <Input
     id={selectId}
     name={inputNameIngredientName}
     label="Selecciona el ingrediente"
     labelProps={{ className: 'ingredient_name' }}
     list="ingredients-options"
     required
     acceptanceCriteria="Solo letras y espacios"
     onChange={onChange}
     pattern="^[\p{L}\s]+$"
     inputInvalid={safeObjectGet(
       inputsErrors,
       inputNameIngredientName as never
     )}
     onBlur={onBlur}
     value={safeObjectGet(
       inputsData,
       inputNameIngredientName as never
     )}
   />

   <Input
     id={inputNameQty}
     type="number"
     label="Selecciona la cantidad"
     name={inputNameQty}
     labelProps={{ className: 'ingr_qty' }}
     required
     acceptanceCriteria="Solo números"
     inputInvalid={safeObjectGet(
       inputsErrors,
       inputNameQty
     )}
     onBlur={onBlur}
     onChange={onChange}
     value={safeObjectGet(
       inputsData,
       inputNameQty
     )}
     step={0.1}
   />
   <IngredientUom className="ingredient_uom">{unitOM}</IngredientUom >
   <ButtonDeleteSelect
     data-select-id={selectId}
     className="button_delete_ingredient"
     onClick={deleteSelect}
   />
 </>
}

const Option: FC<{
  opt: RootState['ingredients']['ingredients'][0] &
  { key: any } }> = ({ opt }) => <Fragment key={opt.key}>
    <option
        value={opt.ingredient_name}
        data-ingredient-id={opt.ingredient_id}
        data-uom={opt.uom_name}
        >
        {opt.ingredient_name}</option>
  </Fragment>

interface IngredientComponentProps extends
  Omit<UseMultipleSelectsReturn,
  'data' | 'Component' | 'resetMultipleSelect' | 'addSelect' | 'disableButton' | 'onChange'> {
  selectId: string
  onChange: OnChangeProp
}

type OnChangeProp = (ev: ChangeEvent<HTMLInputElement>, inputIngredientNamePropName: string) => void

const Container = styled.div`
  display: grid;
  width: 100%;
`

const IngredientUom = styled.p`
  text-align: center;
`

const SelectionArea = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  padding-bottom: 10px;
  grid-template-columns: 2fr .5fr .5fr;
  grid-template-rows: 1fr 4px 1fr;
  border-bottom: 2px solid black;
  justify-content: space-around;
  align-items: center;
  grid-template-areas: 
"ingredient_name . ."
". ingredient_uom delete_ingredient"
"ingredient_qty . .";
  .ingredient_name {
    grid-area: ingredient_name;
    margin-top: 40px;
  }
  .ingredient_uom {
    grid-area: ingredient_uom;
  }
  .button_delete_ingredient {
    grid-area: delete_ingredient;
  }
  .ingr_qty {
    grid-area: ingredient_qty;
  }
  @media screen and (min-width: 1024px) {
    grid-template-areas: "ingredient_name ingredient_qty ingredient_uom delete_ingredient";
    grid-template-columns: 3fr 3fr .5fr 1fr ;
    grid-template-rows: 1fr;
    align-content: center;
    align-items: center;
    & label {
      width: 95%;
    }
    .button_delete_ingredient {
      margin-left: 20px;
      width: 70px;
      justify-self: right;
    }
    .ingredient_name {
      margin-top: 10px;
    }
  }
`

const SectionTitle = styled.p`
  text-align: center;
  font-size: 25px;
  margin-bottom: 10px;
  font-weight: bold;
`

export default SelectIngredients
