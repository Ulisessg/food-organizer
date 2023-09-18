import React, { type FC, Fragment, useContext } from 'react'
import Food from './Food'
import { ModalUpdateDataContext } from 'context/ModalUpdateDataContext'
import { type RootState } from 'redux/store'
import { useSelector } from 'react-redux'

const UpdateFoods: FC = () => {
  const { groupingElementIndex } = useContext(ModalUpdateDataContext)
  const { foods, food_type_id } = useSelector((state: RootState) => state
    .foods
    .foodsGroupedByType[Number(groupingElementIndex)])
  const { foodTypes } = useSelector((state: RootState) => state.foods)
  return <>
    {foods.map((food, index) => <Fragment key={`${food.food_name}${food.food_id}`}>
      <Food
        {...food}
        food_type_id={food_type_id}
        elementIndex={index}
        groupingElementIndex={groupingElementIndex as number}
        foodTypes={foodTypes}
      />
    </Fragment>)}
  </>
}

export default UpdateFoods
