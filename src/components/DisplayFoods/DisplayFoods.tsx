/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable camelcase */
import React, { type FC, Fragment } from 'react'
import { Table, Th } from 'd-system'
import { type GetFoods } from 'controllers/food_organizer_crud/foodsCRUD'
import Rows from './Rows'
import TableContainer from '../common/TableContainer'

const DisplayFoods: FC<Props> = ({ foodsOrderByType }) => (<>
  <TableContainer>
    <Table caption="Comidas">
      <thead>
        <tr>
          <Th>Tipo de comida</Th>
          <Th>Comida</Th>
          <Th>Tiempo de preparacion</Th>
          <Th>Puntuación</Th>
          <Th>Imagen</Th>
          <Th>Acciones</Th>
        </tr>
      </thead>
      <tbody>
        {foodsOrderByType.map(({
          food_type_id,
          food_type_name,
          foods
        }) => <Fragment key={food_type_id}>
          {foods.map(({
            food_id,
            food_name,
            image,
            preparation_time,
            score
          }, index) => <Fragment key={food_id}>{index === 0 && <>
                <Rows food_name={food_name} food_type_name={food_type_name}
                  image={image}
                  preparation_time={preparation_time}
                  score={score}
                  rowSpan={foods.length} />
              </>}
              {index !== 0 && <>
                <Rows food_name={food_name} food_type_name={food_type_name}
                  image={image}
                  preparation_time={preparation_time}
                  score={score}
                   />
              </>}
          </Fragment>)}
        </Fragment>)}
      </tbody>
    </Table>
  </TableContainer>
</>
)

interface Props {
  foodsOrderByType: GetFoods
}

export default DisplayFoods
