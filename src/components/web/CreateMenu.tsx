/* eslint-disable max-lines-per-function */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable camelcase */
import { Button, Form, Input, LoadingSpinner } from 'd-system'
import {
  ButtonAddSelect,
  ButtonDeleteSelect,
  Container
} from './common/MultipleSelects'
import React, { type FC, Fragment } from 'react'
import Details from './common/Details'
import ErrorMessage from './common/ErrorMessage'
import { LoadingSpinnerContainer } from './common/FormInDetailsStyles'
import RequestResultStyles from './common/RequestResultStyles'
import { type RootState } from 'redux/store'
import Select from './common/Select'
import randomId from 'utils/randomId'
import safeArrayGet from 'utils/safeArrayGet'
import useCreateMenu from 'hooks/components/useCreateMenu'
import useMultipleSelects from 'hooks/context/useMultipleSelectsContext'
import { useSelector } from 'react-redux'

// eslint-disable-next-line max-lines-per-function
const CreateMenu: FC = () => {
  const foodsData = useSelector((state: RootState) => state.foods)
  const menusData = useSelector((state: RootState) => state.menus)
  const {
    addSelect, data: selectsData,
    deleteSelect, onChange: handleSelects,
    disableButton,
    resetMultipleSelect
  } = useMultipleSelects(
    // eslint-disable-next-line no-undefined
    undefined,
    foodsData.foods.length
  )
  const {
    inputsData,
    onChange,
    disableButton: disableCreateMenuButton,
    createMenu
  } = useCreateMenu(
    selectsData.valuesUsed,
    resetMultipleSelect
  )

  return <>
    <Details summary="Crear menú">
      {foodsData.getFoodsIsLoading && <LoadingSpinner size="large" />}
      {foodsData.getFoodsError &&
      <ErrorMessage message="Error obteniendo las comidas" action="intenta de nuevo más tarde"/>}

      {foodsData.getFoodsSuccess && <Form formTitle="Información del menú">
        {selectsData.selects.map(({ selectId }, index) => <Fragment key={selectId}>
          {/* Required select */}
          {index === 0 &&
          <Select id={selectId} labelText="Selecciona una comida"
            value={safeArrayGet(
              selectsData.selectsValues,
              index
            ).value}
            onChange={handleSelects}
          >
            {foodsData
              .foodsGroupedByType
              .map(({ food_type_name, foods: foodsInfo }) => <Fragment key={randomId()}>
              <optgroup label={food_type_name}>
                {foodsInfo.map(({ food_name, food_id }) => <option
                  key={randomId()}
                  value={food_name}
                  disabled={
typeof selectsData.valuesUsed.find((vUsed) => vUsed === food_name) !== 'undefined'
                  }
                  data-food-id={food_id}
                >
                  {food_name}
                </option>)}
              </optgroup>
            </Fragment>)}
          </Select>}

          {index !== 0 && <>
            <Container>
              <Select id={selectId} labelText="Selecciona una comida"
                value={safeArrayGet(
                  selectsData.selectsValues,
                  index
                ).value}
                onChange={handleSelects}
              >
                {foodsData
                  .foodsGroupedByType
                  .map(({ food_type_name, foods: foodsInfo }) => <Fragment key={randomId()}>
              <optgroup label={food_type_name}>
                {foodsInfo.map(({ food_name, food_id }) => <option
                  key={randomId()}
                  value={food_name}
                  disabled={
typeof selectsData.valuesUsed.find((vUsed) => vUsed === food_name) !== 'undefined'
                  }
                  data-food-id={food_id}
                  >
                    {food_name}
                </option>)}
              </optgroup>
            </Fragment>)}
              </Select>
              <ButtonDeleteSelect data-select-id={selectId}
                onClick={deleteSelect}
              />
            </Container>
          </>}
        </Fragment>)}
        <ButtonAddSelect
          disabled={disableButton}
          text="Agregar comida"
          onClick={addSelect}
        />
        <Input
          id="menu_comment"
          inputMode="text"
          label="Comentarios"
          acceptanceCriteria="Opcional"
          name="menu_comment"
          type="text"
          value={inputsData.menu_comment}
          onChange={onChange}
        />
        <Button
          colorMessage="continue"
          size="100%"
          text="Crear menú"
          type="button"
          disabled={disableCreateMenuButton}
          onClick={createMenu}
        />
        {menusData.createMenuIsLoading && <LoadingSpinnerContainer>
            <LoadingSpinner size="large" />
          </LoadingSpinnerContainer>}
        <RequestResultStyles
          hidden={!menusData.errorCreatingMenu}
          isError={true}
        >
          Ocurrió un error creando el menú
        </RequestResultStyles>
        <RequestResultStyles
          hidden={!menusData.createMenuSuccess}
          isError={false}
        >
          Menú creado!
        </RequestResultStyles>
      </Form>}
    </Details>
  </>
}

export default CreateMenu
