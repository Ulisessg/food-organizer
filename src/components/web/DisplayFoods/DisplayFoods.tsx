/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable camelcase */
import React, { type FC, Fragment } from 'react'
import { Table, Th } from 'd-system'
import { type RootState } from 'redux/store'
import Rows from './Rows'
import TableContainer from '../common/TableContainer'
import { useSelector } from 'react-redux'

const DisplayFoods: FC = () => {
  const foodsData = useSelector((state: RootState) => state.foods)
  return (<>
    <TableContainer>
      <Table caption="Comidas">
        <thead>
          <tr>
            <Th>Tipo de comida</Th>
            <Th>Comida</Th>
            <Th>Tiempo de preparacion</Th>
            <Th>Imagen</Th>
            <Th>Acciones</Th>
          </tr>
        </thead>
        <tbody>
          {foodsData.foodsGroupedByType.map(({
            food_type_id,
            food_type_name,
            foods
          }) => <Fragment key={food_type_id}>
            {foods.map(({
              food_id,
              food_name,
              image,
              preparation_time
            }, index) => <Fragment key={food_id}>{index === 0 && <>
                  <Rows food_name={food_name} food_type_name={food_type_name}
                    image={image}
                    preparation_time={preparation_time}
                    rowSpan={foods.length}
                  />
                </>}
                {index !== 0 && <>
                  <Rows food_name={food_name} food_type_name={food_type_name}
                    image={image}
                    preparation_time={preparation_time}
                  />
                </>}
            </Fragment>)}
          </Fragment>)}
        </tbody>
      </Table>
    </TableContainer>
  </>
  )
}

export default DisplayFoods
