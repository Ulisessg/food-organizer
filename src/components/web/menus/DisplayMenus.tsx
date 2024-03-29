/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/naming-convention */
import { Button, Table, Td, Th } from 'd-system'
import React, { type FC, Fragment } from 'react'
import { type GetMenus } from 'controllers/nextjs/MenuCRUD'
import { type RootState } from 'redux/store'
import TableContainer from '../common/TableContainer'
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
              <Td rowSpan={menu_foods.length}>{comment}</Td>
              <Td rowSpan={menu_foods.length}>
                <Button
                  colorMessage="info"
                  size="small"
                  text="Editar"
                  onClick={handleUpdate}
                />
              </Td>
            </tr>
          </>}

          {index !== 0 && <>
            <tr>
              <Td>{food_name}</Td>
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
