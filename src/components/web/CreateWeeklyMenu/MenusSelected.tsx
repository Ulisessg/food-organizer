import Menu, { MenusContainer } from './Menu'
import React, { type ChangeEvent, type FC, Fragment } from 'react'
import RequestResultStyles from 'components/web/common/RequestResultStyles'
import { type RootState } from 'redux/store'
import randomId from 'utils/randomId'

const MenusSelected: FC<TMenusSeletedProps> = ({ menus, onMenuDeselected }) => (<>
      <RequestResultStyles
        hidden={menus.length !== 0}
        isError={true}
      >Aún has seleccionado un menú</RequestResultStyles>
  <MenusContainer>
      {
        menus.map((menu) => <Fragment key={randomId()}>
            <Menu menu={menu} onMenuSelectionChange={onMenuDeselected} isChecked={true}></Menu>
        </Fragment>)
      }
    </MenusContainer>
</>
)

interface TMenusSeletedProps {
  menus: RootState['menus']['menus']
  onMenuDeselected: (ev: ChangeEvent<HTMLInputElement>) => void
}

export default MenusSelected
