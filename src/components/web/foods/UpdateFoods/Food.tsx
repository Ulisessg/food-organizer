import { Form, Input, Select } from 'd-system'
import React, { type FC, Fragment } from 'react'
import { ButtonsUpdate } from 'components/web/common/ModalUpdateData'
import { type GetFoodTypes } from 'controllers/sql/foodTypes/types'
import { type SingleFood } from 'redux/slices/foodsSlice/types'
import SystemImage from 'components/web/common/SystemImage'
import useUpdateFood from 'hooks/components/foods/useUpdateFood'

const Food: FC<FoodProps> = (food) => {
  const {
    inputsData,
    onChange,
    disableRestartButton,
    disableUpdateButton,
    selectImage,
    imageInputHasChanged,
    restartInputs,
    updateFood
  } = useUpdateFood({
    elementIndex: food.elementIndex,
    food,
    food_type_id: food.food_type_id,
    groupingElementIndex: food.groupingElementIndex
  })

  return (
    <Form formTitle="Actualizar comida">
      <SystemImage
        fileName={inputsData.update_food_image}
        imageIsInTemporal={imageInputHasChanged}
        table="foods"
        alt="Sin imagen"
      />
      <Input
        id={food.food_name}
        name="update_food_name"
        label="Nombre"
        value={inputsData.update_food_name}
        onChange={onChange}
        style={{ textTransform: 'capitalize' }}
      />
      <Input
        id={`update_food_image_${food.food_name}`}
        name="update_food_image"
        label="Seleccionar imagen"
        type="image"
        onChange={onChange}
        onClick={(ev) => {
          ev.preventDefault()
          void selectImage()
        }}
      />
      <Input
        id={`update_prep_time_${food.food_name}`}
        name="update_prep_time"
        label="Tiempo de preparacion"
        type="number"
        value={inputsData.update_prep_time}
        onChange={onChange}
        style={{ textTransform: 'capitalize' }}
      />
      <Select
        id={`update_food_type${food.food_name}`}
        name="update_food_type"
        label="Cambiar tipo de comida"
        value={inputsData.update_food_type}
        onChange={onChange}
      >
        {food.foodTypes.map((foodType) => <Fragment key={`${foodType.id}${foodType.name}`}>
          <option value={foodType.id}>{foodType.name}</option>
        </Fragment>)}
      </Select>
      <ButtonsUpdate
      buttonContinueProps={{
        disabled: disableUpdateButton,
        onClick: updateFood
      }}
      buttonRestartProps={{
        disabled: disableRestartButton,
        onClick: restartInputs
      }}
    />
    </Form>
  )
}

interface FoodProps extends SingleFood {
  food_type_id: number
  elementIndex: number
  groupingElementIndex: number
  foodTypes: GetFoodTypes
}

export default Food
