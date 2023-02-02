/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable camelcase */
import { Button, Form, Input, LoadingSpinner } from 'd-system'
import {
  ButtonAddSelect,
  ButtonDeleteSelect,
  Container
} from './common/MultipleSelects'
import React, { type FC, Fragment, useState } from 'react'
import Details from './common/Details'
import ErrorMessage from './common/ErrorMessage'
import { type GetFoods } from 'controllers/food_organizer_crud/foodsCRUD'
import Select from './common/Select'
import randomId from 'utils/randomId'
import useGetRequest from 'hooks/useGetRequest'
import useMultipleSelects from 'hooks/useMultipleSelects'

// eslint-disable-next-line max-lines-per-function
const CreateMenu: FC = () => {
  const [
    totalFoods,
    setTotalFoods
  ] = useState<number>(0)
  const { data: foodsData, isLoading, error } = useGetRequest('/api/foods')
  const {
    addSelect: handleAdSelect, data: selectsData,
    deleteSelect, onChange: handleSelects
  } = useMultipleSelects()
  const foods = foodsData as GetFoods

  const addSelect = (): void => {
    handleAdSelect()
    if (totalFoods !== 0) return
    foods.forEach(({ total_foods: tf }) => {
      setTotalFoods((prev) => prev + tf)
    })
  }

  return <>
    <Details summary="Crear menú">
      {isLoading && <LoadingSpinner size="large" />}
      {error &&
      <ErrorMessage message="Error obteniendo las comidas" action="intenta de nuevo más tarde"/>}

      {(!error && !isLoading) && <Form formTitle="Información del menú">
        {selectsData.selects.map(({ selectId }, index) => <Fragment key={selectId}>
          {/* Required select */}
          {index === 0 &&
          <Select id={selectId} labelText="Selecciona una comida"
            value={selectsData.selectsValues[index].value}
            onChange={handleSelects}
          >
            {foods.map(({ food_type_name, foods: foodsInfo }) => <Fragment key={randomId()}>
              <optgroup label={food_type_name}>
                {foodsInfo.map(({ food_name }) => <option
                  key={randomId()}
                  value={food_name}
                  disabled={
typeof selectsData.valuesUsed.find((vUsed) => vUsed === food_name) !== 'undefined'
                  }
                >
                  {food_name}
                </option>)}
              </optgroup>
            </Fragment>)}
          </Select>}

          {index !== 0 && <>
            <Container>
              <Select id={selectId} labelText="Selecciona una comida"
                value={selectsData.selectsValues[index].value}
                onChange={handleSelects}
              >
                {foods.map(({ food_type_name, foods: foodsInfo }) => <Fragment key={randomId()}>
              <optgroup label={food_type_name}>
                {foodsInfo.map(({ food_name }) => <option
                  key={randomId()}
                  value={food_name}
                  disabled={
typeof selectsData.valuesUsed.find((vUsed) => vUsed === food_name) !== 'undefined'
                  }
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
          disabled={selectsData.selects.length === totalFoods}
          text="Agregar comida"
          onClick={addSelect}
        />
        <Input
          id="menu_comment"
          inputMode="text"
            label="Comentarios (opcional)"
            name="menu_comment"
            placeholder="Remojar el garbanzo en la noche..."
            type="text"
        />
        <Button
          colorMessage="continue"
          size="100%"
          text="Crear menú"
          type="button"
        />
      </Form>}
    </Details>
  </>
}

export default CreateMenu
