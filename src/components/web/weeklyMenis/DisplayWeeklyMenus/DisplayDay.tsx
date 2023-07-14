/* eslint-disable max-lines-per-function */
import { Td as DSystemTd, Table, Th } from 'd-system'
import React, { type FC, Fragment } from 'react'
import EditTableButtonsComponent from '../../common/EditTableButtons'
import { type TDay } from 'controllers/food_organizer_crud/sql/weeklyMenus/getWeeklyMenusSql'
import TableContainer from '../../common/TableContainer'
import randomId from 'utils/randomId'
import styled from 'styled-components'

const DisplayDay: FC<{ dayliMenu: TDay, day: string }> =
({ dayliMenu, day }) => <>
<TableContainer className="daily_menu">
  <Table caption={`Comidas del ${day}`}>
    <thead>
      <tr>
        <Th>
          Identificador del menú
        </Th>
        <Th>
          Comidas
        </Th>
        <Th>
          Acciones
        </Th>

      </tr>
    </thead>
    <tbody>
      {dayliMenu === null && <>
        <tr>
          <Td
            className="day_no_data"
            colSpan={3}
          >Aun no has añadido un menu al {day}</Td>
        </tr>
      </>

      }
      {dayliMenu?.map((menus) => <Fragment key={randomId(day)}>
      {menus.foods.map((food, foodIndex) => <Fragment key={randomId()}>
        {foodIndex === 0 && <>
          <tr>
            <Td rowSpan={menus.foods.length}>{menus.menu_id}</Td>
            <Td>{food.food_name}</Td>
            <EditTableButtons onUpdate={() => {
              //
            }}></EditTableButtons>
          </tr>
        </>}
        {foodIndex !== 0 && <>
          <tr>
            <Td>{food.food_name}</Td>
            <EditTableButtons onUpdate={() => {
              //
            }}></EditTableButtons>
          </tr>
        </>}
      </Fragment>)}
      </Fragment>)}
    </tbody>
  </Table>
</TableContainer>
</>

const Td = styled(DSystemTd)`
  padding:  0px !important;
`

const EditTableButtons = styled(EditTableButtonsComponent)`
grid-gap: 10px;
width: 200px;
`

export default DisplayDay
