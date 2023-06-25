/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/naming-convention */
import React, { type FC, Fragment } from 'react'
import { Table, Td, Th } from 'd-system'
import EditTableButtons from './common/EditTableButtons'
import { type GetMenus } from 'controllers/food_organizer_crud/nextjs/MenuCRUD'
import { type RootState } from 'redux/store'
import TableContainer from './common/TableContainer'
import { useSelector } from 'react-redux'

const DisplayDailyMenus: FC<DisplayDailyMenusProps> = () => {
  const menus = useSelector((state: RootState) => state.menus)
  const handleUpdate = (): void => {
    console.log('Update!')
  }

  return <TableContainer>
  <Table caption="Menus diarios">
    <thead>
      <tr>
        <Th>Id del menú</Th>
        <Th>Comidas</Th>
        <Th>Comentarios</Th>
        <Th>Acciones</Th>
      </tr>
    </thead>
    <tbody>
      {menus.menus.map(({ id, comment, menu_foods }) => <Fragment key={id}>
        {menu_foods.map(({ food_id, food_name }, index) => <Fragment key={food_id}>
          {index === 0 && <>
            <tr>
              <Td rowSpan={menu_foods.length}>{id}</Td>
              <Td>{food_name}</Td>
              <Td>{comment}</Td>
              <EditTableButtons onUpdate={handleUpdate} />
            </tr>
          </>}

          {index !== 0 && <>
            <tr>
              <Td>{food_name}</Td>
              <Td>{comment}</Td>
              <EditTableButtons onUpdate={handleUpdate} />
            </tr>

          </>}
        </Fragment>)}
      </Fragment>)}
    </tbody>
  </Table>
  </TableContainer>
}

interface DisplayDailyMenusProps {
  menus: GetMenus
}

export default DisplayDailyMenus
