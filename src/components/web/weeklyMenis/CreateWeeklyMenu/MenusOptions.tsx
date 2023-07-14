import Menu, { MenusContainer } from './Menu'
import React, { type ChangeEvent, type FC, Fragment } from 'react'
import RequestResultStyles from 'components/web/common/RequestResultStyles'
import { type TDaysOfTheWeek } from 'utils/constants'
import { type TUseCreateWeeklyMenuReturn } from 'hooks/components/useCreateWeeklyMenu'
import useMenusOptions from 'hooks/components/useMenusOptions'

const MenusOptions: FC<TMenusProps> = ({
  filters,
  onMenuSelected,
  menusIdsUsed,
  day
}) => {
  const { menusToDisplay } = useMenusOptions(
    filters,
    menusIdsUsed,
    day
  )

  return (
    <>
      <RequestResultStyles
        hidden={menusToDisplay.length !== 0 }
        isError={true}>
          No hay menús con esos filtros
      </RequestResultStyles>
      <MenusContainer id="menus_to_select_container">
        {menusToDisplay.length >= 1 && menusToDisplay.map((menu) => <Fragment key={menu.id}>
          <Menu menu={menu} onMenuSelectionChange={onMenuSelected} isChecked={false} />
        </Fragment>)}
      </MenusContainer>
    </>
  )
}

interface TMenusProps {
  filters: TUseCreateWeeklyMenuReturn['filters']
  onMenuSelected: (ev: ChangeEvent<HTMLInputElement>) => void
  menusIdsUsed: TUseCreateWeeklyMenuReturn['menusIdsUsed']
  day: TDaysOfTheWeek
}

export default MenusOptions
