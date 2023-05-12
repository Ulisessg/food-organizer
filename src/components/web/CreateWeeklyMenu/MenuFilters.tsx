/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
import { Button, Input, useInputs } from 'd-system'
import React, { type ChangeEvent, type FC } from 'react'
import Filter from 'components/web/common/Filter'
import { type RootState } from 'redux/store'
import { type TUseCreateWeeklyMenuReturn } from 'hooks/components/useCreateWeeklyMenu'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

const MenuFilters: FC<SeachExistentMenuProps> = ({
  updateFilters,
  filters,
  restartFilters
}) => {
  const ingredients = useSelector((state: RootState) => state.ingredients.ingredients)
  const foods = useSelector((state: RootState) => state.foods.foods)

  const { inputsData, onChange: OnChangeFilters, restartInputs } = useInputs(
    {
      foods_filter: '',
      ingredients_filter: ''
    },
    false
  )

  const onChange = (ev: ChangeEvent<HTMLInputElement>): void => {
    OnChangeFilters(ev)
    const input: HTMLInputElement = ev.currentTarget as HTMLInputElement
    const inputName: TFilters = input.name as TFilters

    if (inputName === 'foods_filter') {
      const foodsDatalist:
      HTMLDataListElement = document.getElementById('foods_filter_list') as HTMLDataListElement
      const foodName = input.value
      const foodOptionElement = foodsDatalist?.querySelector(`option[value='${foodName}' i]`)

      if (foodOptionElement !== null) {
        updateFilters(
          'add',
          (foodOptionElement as HTMLOptionElement).value,
          'foods'
        )
        restartInputs('foods_filter')
      }
    }
    if (inputName === 'ingredients_filter') {
      const ingredientDatalist:
      HTMLDataListElement = document
        .getElementById('ingredients_filter_list') as HTMLDataListElement
      const ingredientName = input.value
      const ingredientOptionElement =
        ingredientDatalist.querySelector(`option[value='${ingredientName}' i]`)
      if (ingredientOptionElement !== null) {
        updateFilters(
          'add',
          ingredientName,
          'ingredients'
        )
        restartInputs('ingredients_filter')
      }
    }
  }
  return <MenuFiltersContainer>
    <SectionTitle>Filtros</SectionTitle>
      <Button
        colorMessage="continue"
        size="small"
        text="Borrar filtros"
        onClick={restartFilters}
        style={{ justifySelf: 'end' }}
        type="button"
      />
    <FiltersSection>
      <Input
        id="foods_filter"
        label="Comidas"
        name="foods_filter"
        list="foods_filter_list"
        onChange={onChange}
        value={inputsData.foods_filter}
      />
   <datalist id="foods_filter_list">
    {foods.map((food) => <option
      key={food.food_id}
      value={food.food_name}
      disabled={filters.some((filter) => filter.value === food.food_name)}
    >
      {food.food_name}
    </option>)}
   </datalist>
    <Input
      id="ingredients_filter"
      label="Ingredientes"
      name="ingredients_filter"
      list="ingredients_filter_list"
      onChange={onChange}
      value={inputsData.ingredients_filter}
    />
      <datalist id="ingredients_filter_list">
        {ingredients.map((ingr) => <option
          key={ingr.ingredient_id}
          value={ingr.ingredient_name}
          disabled={filters.some((filter) => filter.value === ingr.ingredient_name)}
      >
      {ingr.ingredient_name}
    </option>)}
   </datalist>
    </FiltersSection>
    <FiltersContainer>
      {filters.map((filter) => <Filter
        value={filter.value}
        key={filter.value}
        updateFilter={updateFilters as any}
        propName={filter.propertyName}
      />)}
    </FiltersContainer>
  </MenuFiltersContainer>
}

const SectionTitle = styled.p`
  text-align: center;
  font-weight: bold;
  font-size: 20px;
`

const FiltersSection = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 780px) {
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
  }
`

const FiltersContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  margin-bottom: 30px;
  height: auto;
  @media screen and (min-width: 550px) {
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 50px;
  }
  @media screen and (min-width: 780px) {
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 50px;
  }
`

const MenuFiltersContainer = styled.div`
  width: 100%;
  display: grid;
`

interface SeachExistentMenuProps {
  updateFilters: TUseCreateWeeklyMenuReturn['updateFilters']
  restartFilters: () => void
  filters: TUseCreateWeeklyMenuReturn['filters']
}

type TFilters = 'foods_filter' | 'ingredients_filter'

export default MenuFilters
