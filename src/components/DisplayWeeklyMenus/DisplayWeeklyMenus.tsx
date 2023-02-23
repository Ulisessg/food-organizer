/* eslint-disable max-lines-per-function */
import { Td as DSystemTd, Input, Select, Table, Th, useInputs } from 'd-system'
import React, { type ChangeEvent, type FC, Fragment, type ReactNode } from 'react'
import EditTableButtonsComponent from '../common/EditTableButtons'
import RequesResultStyles from '../common/RequestResultStyles'
import { type RootState } from 'redux/store'
import { type TDay } from 'controllers/food_organizer_crud/weeklyMenuCRUD'
import TableContainer from '../common/TableContainer'
import { dayInMiliseconds } from 'utils/constants'
import dayjs from 'dayjs'
import getWeekRangeOfDates from 'utils/getWeekRangeOfDates'
import randomId from 'utils/randomId'
import styled from 'styled-components'
import useDisplayWeeklyMenus from 'hooks/components/useDisplayWeeklyMenus'
import { useSelector } from 'react-redux'

const DisplayWeeklyMenus: FC = () => {
  const weeklyMenusData = useSelector((state: RootState) => state.weeklyMenus)
  const { inputsData, onChange: UseInputsOnChange } = useInputs(
    {
      filter_by_wm_ammount: 'week',

      /** Today */
      pick_date: dayjs().format('YYYY-MM-DD')
    },
    false
  )
  const {
    dailyMenu,
    menusToShow,
    searchWeeklyMenu,
    weeklyMenu
  } = useDisplayWeeklyMenus()

  const onChange = (ev: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    UseInputsOnChange(ev as any)
    if (ev.currentTarget.name === 'filter_by_wm_ammount') {
      searchWeeklyMenu(
        dayjs(inputsData.pick_date).toDate(),
        ev.currentTarget.value
      )
    } else if (ev.currentTarget.name === 'pick_date') {
      const targetElement = ev.currentTarget as HTMLInputElement

      /*
       * Value as date is
       * inexact by one day
       * https://stackoverflow.com/questions/28506845/adding-one-day-to-an-input-type-date-value
       */
      // eslint-disable-next-line init-declarations
      let fixedDate: Date
      if (typeof targetElement.valueAsDate === 'undefined') {
        fixedDate = dayjs('Invalid date').toDate()
      } else {
        fixedDate = dayjs((targetElement.valueAsDate as Date).getTime() + dayInMiliseconds).toDate()
      }

      searchWeeklyMenu(
        fixedDate,
        inputsData.filter_by_wm_ammount
      )
    }
  }

  return <>
  <b><p>Las semanas comienzan los domingos y terminan los sabados</p></b>
  <Input
    id="pick_date"
    label="Selecciona una fecha"
    name="pick_date"
    type="date"
    onChange={onChange}
    value={inputsData.pick_date}
    acceptanceCriteria="Formato: DD-MM-YYYY"
    style={{ width: '90vw' }}
  />

<FiltersContainer>
    <FiltersTitle>Filtros</FiltersTitle>
    <Select
      id="filter_by_wm_ammount"
      label="Cuantos menus semanales quieres ver"
      name="filter_by_wm_ammount"
      value={inputsData.filter_by_wm_ammount}
      onChange={onChange}
      >
        <option value="week">La semana seleccionada</option>
        <option value="day">El dia seleccionado</option>
        <option value="all">Todos los menus semanales</option>
    </Select>
  </FiltersContainer>

  {menusToShow === 'week' && <DispkayWeeklyMenusContainer sowDate={false}>
    <DisplayDay day="Lunes" dayliMenu={weeklyMenu.monday} />
    <DisplayDay day="Martes" dayliMenu={weeklyMenu.tuesday} />
    <DisplayDay day="Miercoles" dayliMenu={weeklyMenu.wednesday} />
    <DisplayDay day="Jueves" dayliMenu={weeklyMenu.tuesday} />
    <DisplayDay day="Viernes" dayliMenu={weeklyMenu.friday} />
    <DisplayDay day="Sábado" dayliMenu={weeklyMenu.saturday} />
    <LastDayContainer>
    <DisplayDay day="Domingo" dayliMenu={weeklyMenu.sunday} />
    </LastDayContainer>
  </DispkayWeeklyMenusContainer>}
  {menusToShow === 'all' && <>
    {weeklyMenusData.weeklyMenus.map((wm) => <Fragment key={wm.id}>
  <DispkayWeeklyMenusContainer sowDate={true} date={wm.creation_date}>
     <DisplayDay day="Lunes" dayliMenu={wm.monday} />
     <DisplayDay day="Martes" dayliMenu={wm.tuesday} />
     <DisplayDay day="Miercoles" dayliMenu={wm.wednesday} />
     <DisplayDay day="Jueves" dayliMenu={wm.tuesday} />
     <DisplayDay day="Viernes" dayliMenu={wm.friday} />
     <DisplayDay day="Sábado" dayliMenu={wm.saturday} />
     <LastDayContainer>
      <DisplayDay day="Domingo" dayliMenu={wm.sunday} />
     </LastDayContainer>
  </DispkayWeeklyMenusContainer>
    </Fragment>)}
  </>}
  {menusToShow === 'day' && <DispkayWeeklyMenusContainer sowDate={true} date={inputsData.pick_date}>
    <LastDayContainer>
    <DisplayDay day={dailyMenu.day} dayliMenu={dailyMenu.menu} />
    </LastDayContainer>
  </DispkayWeeklyMenusContainer>}
  <NoMenusToShow hidden={menusToShow !== 'none'} isError={true}>
    Aun no hay ningún menú registrado en esta fecha
  </NoMenusToShow>
  </>
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

const DispkayWeeklyMenusContainerStyles = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  width: 90vw;
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
  @media screen and (min-width: 1020px) {
    grid-template-columns: 1fr 1fr;
    grid-gap: 15px;
  }

`

const DispkayWeeklyMenusContainer: FC<
{
  children: ReactNode
  sowDate: boolean
  date?: string
}> = ({ children, sowDate, date }) => {
  const rangeOfDates = getWeekRangeOfDates(dayjs(date).toDate() ?? '')
  return <>
     {sowDate && <p>{rangeOfDates.mondayDate} - {rangeOfDates.sundayDate}</p>}
     <DispkayWeeklyMenusContainerStyles>
     {children}
     </DispkayWeeklyMenusContainerStyles>
   </>
}

const LastDayContainer = styled.div`
  @media screen and (min-width: 1020px) {  
    grid-column: span 2;
    width: 90%;
    justify-self: center;
    & table {
      width: 100%;
    }
  }
`

const Td = styled(DSystemTd)`
  padding:  0px !important;
`

const FiltersContainer = styled.section`
  display: grid;
  cursor: pointer;
  margin-top: 20px;
`
const FiltersTitle = styled.p`
  font-weight: bold;
`
const EditTableButtons = styled(EditTableButtonsComponent)`
grid-gap: 10px;
width: 200px;
`

const NoMenusToShow = styled(RequesResultStyles)`
  margin: 50px 0px;
`

export default DisplayWeeklyMenus
