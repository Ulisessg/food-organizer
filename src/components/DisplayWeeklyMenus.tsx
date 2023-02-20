/* eslint-disable max-lines-per-function */
import React, { type FC, Fragment } from 'react'
import { Table, Td, Th } from 'd-system'
import EditTableButtons from './common/EditTableButtons'
import { type RootState } from 'redux/store'
import { type TDay } from 'controllers/food_organizer_crud/weeklyMenuCRUD'
import TableContainer from './common/TableContainer'
import randomId from 'utils/randomId'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

const DisplayWeeklyMenus: FC = () => {
  const weeklyMenusData = useSelector((state: RootState) => state.weeklyMenus)
  return <DispkayWeeklyMenusContainer>
    {weeklyMenusData.weeklyMenus.map((wm) => <Fragment key={wm.id}>
     <DisplayDay day="Lunes" dayliMenu={wm.monday} />
     <DisplayDay day="Martes" dayliMenu={wm.tuesday} />
     <DisplayDay day="Miercoles" dayliMenu={wm.wednesday} />
     <DisplayDay day="Jueves" dayliMenu={wm.tuesday} />
     <DisplayDay day="Viernes" dayliMenu={wm.friday} />
     <DisplayDay day="Sábado" dayliMenu={wm.saturday} />
     <LastDayContainer>
      <DisplayDay day="Domingo" dayliMenu={wm.sunday} />
     </LastDayContainer>
    </Fragment>)}
  </DispkayWeeklyMenusContainer>
}

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

const DispkayWeeklyMenusContainer = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 98vw;
  grid-gap: 15px;
  .day_no_data {
    padding: 5px;
    text-align: center;
    text-transform: initial;
    font-weight: 600;
  }
  .daily_menu{ 
    border: 1.5px solid black;
    height: 500px;
  } 
  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }

`

const LastDayContainer = styled.div`
  grid-column: span 2;
  width: 90%;
  justify-self: center;
  & table {
    width: 100%;
  }
`

export default DisplayWeeklyMenus
