/* eslint-disable max-lines-per-function */
import { Input, Select } from 'd-system'
import React, { type FC, Fragment } from 'react'
import DispkayWeeklyMenusContainer from './DisplayWeeklyMenusContainer'
import DisplayDay from './DisplayDay'
import RequesResultStyles from '../../common/RequestResultStyles'
import { type RootState } from 'redux/store'
import getDayNameFromEnglish from 'utils/getDayNameFromEnglish'
import randomId from 'utils/randomId'
import styled from 'styled-components'
import useDisplayWeeklyMenus from 'hooks/components/useDisplayWeeklyMenus'
import { useSelector } from 'react-redux'

const DisplayWeeklyMenus: FC = () => {
  const weeklyMenusData = useSelector((state: RootState) => state.weeklyMenus)

  const {
    dailyMenu,
    menusToShow,
    weeklyMenu,
    inputsData,
    filtersOnChange
  } = useDisplayWeeklyMenus()

  return <>
  <b><p>Las semanas comienzan los domingos y terminan los sabados</p></b>
  <Input
    id="pick_date"
    label="Selecciona una fecha"
    name="pick_date"
    type="date"
    onChange={filtersOnChange}
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
      onChange={filtersOnChange}
      >
        <option value="week">La semana seleccionada</option>
        <option value="day">El dia seleccionado</option>
        <option value="all">Todos los menus semanales</option>
    </Select>
  </FiltersContainer>

  {menusToShow === 'week' && <DispkayWeeklyMenusContainer
    sowDate={true} date={inputsData.pick_date}>
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
    {weeklyMenusData.weeklyMenus.map((wm) => <Fragment key={randomId()}>
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
    <DisplayDay
      day={getDayNameFromEnglish(dailyMenu.day.toLowerCase())}
      dayliMenu={dailyMenu.menu} />
    </LastDayContainer>
  </DispkayWeeklyMenusContainer>}
  <NoMenusToShow hidden={menusToShow !== 'none'} isError={true}>
    Aun no hay ningún menú registrado en esta fecha
  </NoMenusToShow>
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

const FiltersContainer = styled.section`
  display: grid;
  cursor: pointer;
  margin-top: 20px;
`
const FiltersTitle = styled.p`
  font-weight: bold;
`

const NoMenusToShow = styled(RequesResultStyles)`
  margin: 50px 0px;
`

export default DisplayWeeklyMenus
