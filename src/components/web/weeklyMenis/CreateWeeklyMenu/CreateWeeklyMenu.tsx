/* eslint-disable max-lines-per-function */
import { Button, Form, Input, LoadingSpinner, Select } from 'd-system'
import React, { type FC, useRef } from 'react'
import CreateMenu from 'components/web/menus/CreateMenu'
import Details from '../common/Details'
import { LoadingSpinnerContainer } from 'components/web/common/FormInDetailsStyles'
import MenuFilters from './MenuFilters'
import MenusOptions from './MenusOptions'
import MenusSelected from './MenusSelected'
import RequestResultStyles from 'components/web/common/RequestResultStyles'
import { type RootState } from 'redux/store'
import getDayNameFromSpanish from 'utils/getDayNameFromSpanish'
import safeObjectGet from 'utils/safeObjectGet'
import styled from 'styled-components'
import useCreateWeeklyMenu from 'hooks/components/useCreateWeeklyMenu'
import { useSelector } from 'react-redux'

const CreateWeeklyMenu: FC = () => {
  const days = useSelector((state: RootState) => state.weeklyMenus.days)
  const weeklyMenusData = useSelector((state: RootState) => state.weeklyMenus)

  const formRef = useRef<HTMLFormElement>(null)
  const {
    onChange,
    inputsValues,
    updateFilters,
    filters,
    restartFilters,
    weekIsUsed,
    onMenusSelected,
    onMenuDeselected,
    menusIdsUsed,
    menusSelected,
    daySelected,
    disableButton,
    createWeeklyMenu
  } = useCreateWeeklyMenu(formRef)

  return <Details summary="Crear menú semanal">
  <Form formTitle="Crear menú semanal" ref={formRef}>
  <p>Recuerda que la semana inicia el domingo y termina el sábado</p>
  <Input
    id="create_wm_date_picker"
    label="Selecciona la fecha del menú semanal"
    name="wm_date_picker"
    type="date"
    acceptanceCriteria="Formato: DD-MM-YYYY"
    value={inputsValues.wm_date_picker}
    onChange={onChange}
   />
   <RequestResultStyles
    hidden={!weekIsUsed}
    isError={true}
    style={{ marginBottom: '50px' }}
   >
    Ya usaste esa semana para crear un menu semanal
   </RequestResultStyles>
   <Select
    id="create_wm_day"
    label="Selecciona el día"
    name="day"
    onChange={onChange} value={inputsValues.day}>
      {days.map((day) => <option
        key={day.id}
        data-english-name={getDayNameFromSpanish(day.name)}
      >
        {day.name}
      </option>)}
   </Select>
   <MenuFilters
      updateFilters={updateFilters}
      restartFilters={restartFilters}
      filters={filters}
    />
  <MenusOptions
    filters={filters}
    onMenuSelected={onMenusSelected}
    menusIdsUsed={menusIdsUsed}
    day={daySelected}
  />
  <MenusSelectedMessage>Menús seleccionados</MenusSelectedMessage>
  <MenusSelected
    menus={safeObjectGet(
      menusSelected,
      daySelected
    )}
    onMenuDeselected={onMenuDeselected} />
   <Button
      colorMessage="continue"
      size="100%"
      text="Crear menú semanal"
      type="button"
      disabled={disableButton}
      onClick={createWeeklyMenu}
    />
    {weeklyMenusData.createWeeklyIsLoading && <LoadingSpinnerContainer>
      <LoadingSpinner size="large" />
    </LoadingSpinnerContainer>
    }

    <RequestResultStyles
      hidden={!weeklyMenusData.createWeeklyError}
      isError={true}
    >
      Ocurrió un error creando el menú semanal
    </RequestResultStyles>
    <RequestResultStyles
      hidden={!weeklyMenusData.createWeeklySuccess}
      isError={false}
    >
      Menú semanal creado exitosamente!
    </RequestResultStyles>

  </Form>
  <CreateMenuSectionMessage>
    Si no te convence nigún menu puedes crear uno nuevo
  </CreateMenuSectionMessage>
  <CreateMenu />
  </Details>
}

const CreateMenuSectionMessage = styled.p`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
`

const MenusSelectedMessage = styled.p`
    font-size: 20px;
  font-weight: bold;
  text-align: center;
`

export default CreateWeeklyMenu
