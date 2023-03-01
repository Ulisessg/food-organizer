import React, { type ChangeEvent, type FC, Fragment } from 'react'
import { Input } from 'd-system'
import { type RootState } from 'redux/store'
import randomId from 'utils/randomId'
import styled from 'styled-components'

const Menu: FC<MenuProps> = ({ menu, onMenuSelectionChange, isChecked }) => (<>
  <MenuItem>
    <MenuToDisplayTitle className="menu_title">Menu: {menu.id}</MenuToDisplayTitle>
    <div style={{ display: 'grid' }}>
      <Input
        id={randomId()}
        label="Seleccionar este menú"
        name={randomId()}
        type="checkbox"
        data-menu-id={menu.id}
        labelProps={{ className: 'menu_select' }}
        className="menu_select_input"
        onChange={onMenuSelectionChange}
        checked={isChecked}
        style={{ cursor: 'pointer' }}
      />
    </div>
    <FoodsTitle>Comidas en el menú</FoodsTitle>
    <ol>
      {menu.menu_foods.map((food) => <Fragment key={randomId()}>
        <li>
          <FoodName>{food.food_name}</FoodName>
        </li>
      </Fragment>)}
    </ol>
  </MenuItem>
</>
)

const MenuItem = styled.div`
  display: grid;
  width:100%;
  border-radius: 10px;
  
  justify-items: center;
  align-items: flex-start;
  height: auto;
  padding: 10px;
  justify-self: center;
  border: 1px solid black;
  margin-bottom: 20px;
  grid-template-areas: "menu_title"
  "menu_select"
  "menu_ingredients";
  .menu_title {
    grid-area: menu_title;
  }
  .menu_select {
    grid-area: menu_select;
    width: 100%;

  }
  .menu_select_input {
    outline: none;
    &:hover, &:focus {
      outline: 1px solid blue;
    }
  }
  .menu_ingredients {
    grid-area: menu_ingredients;
  }
`
const MenuToDisplayTitle = styled.p`
  font-weight: bold;
  text-align: center;
`

const FoodsTitle = styled.p`
  font-weight: bold;
`

const FoodName = styled.p`
  text-align: center;
  margin-top: 10px;
`

export const MenusContainer = styled.section`
display: grid;
grid-template-columns: 1fr;
grid-column-gap: 8%;
margin: 50px 0px;
@media screen and (min-width: 780px) {
  grid-template-columns: repeat(2, 1fr);
}

`

interface MenuProps {
  menu: RootState['menus']['menus'][0]
  onMenuSelectionChange: (ev: ChangeEvent<HTMLInputElement>) => void
  isChecked: boolean
}

export default Menu
