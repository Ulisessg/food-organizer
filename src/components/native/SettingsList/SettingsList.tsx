import React, { type FC } from 'react'
import CalendarIcon from './icons/CalendarIcon'
import CupboardIcon from './icons/CupboardIcon'
import FoodsIcon from './icons/FoodsIcon'
import IngredientsIcon from './icons/IngredientsIcon'
import MenusIcon from './icons/MenusIcon'
import { NativeRoutes } from 'utils/constants'
import SettingsCard from './SettingsCard'
import UnitsOfMeasureIcon from 'components/native/SettingsList/icons/UnitsOfMeasureIcon'
import styled from 'styled-components/native'

const SettingsList: FC = () => (
<SettingsListContainer>
<SettingsCard
    title="Menús semanales"
    href={NativeRoutes.adminWeeklyMenus}
  >
    <CalendarIcon />
  </SettingsCard>

  <SettingsCard
    title="Menús"
    href={NativeRoutes.adminMenus}
  >
    <MenusIcon />
  </SettingsCard>

  <SettingsCard
    title="Comidas"
    href={NativeRoutes.adminFoods}
  >
    <FoodsIcon />
  </SettingsCard>

  <SettingsCard
    title="Ingredientes"
    href={NativeRoutes.adminIngredients}
  >
    <IngredientsIcon />
  </SettingsCard>

  <SettingsCard
    title="Ingredientes disponibles"
    href={NativeRoutes.adminStock}
  >
    <CupboardIcon />
  </SettingsCard>

  <SettingsCard
    title="Unidades de medida"
    href={NativeRoutes.adminUnits}
  >
    <UnitsOfMeasureIcon />
  </SettingsCard>

</SettingsListContainer>
)

const SettingsListContainer = styled.View`
  width: 100%;
`

export default SettingsList
