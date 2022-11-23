/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/naming-convention */
import React, { FC, Fragment } from 'react'
import { Table, Td, Th } from 'd-system'
import EditTableButtons from './common/EditTableButtons'
import { GetDailyMenus } from 'controllers/food_organizer_crud/dailyMenuCRUD'
import TableContainer from './common/TableContainer'

const DisplayDailyMenus: FC<DisplayDailyMenusProps> = ({ menus }) => {
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
      {menus.map(({ id, comment, menu_foods }) => <Fragment key={id}>
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
  menus: GetDailyMenus
}

export default DisplayDailyMenus
