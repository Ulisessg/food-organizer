import { Form, Input, LoadingSpinner } from 'd-system'
import React, { type FC } from 'react'
import { ButtonsUpdate } from 'components/web/common/ModalUpdateData'
import RequestResultStyles from 'components/web/common/RequestResultStyles'
import { type RootState } from 'redux/store'
import { useSelector } from 'react-redux'
import useUpdateFoodsType from 'hooks/components/foods/useUpdateFoodsType'

const UpdateFoodsType: FC = () => {
  const {
    onChange,
    inputsData,
    disableRestartButton,
    restartInputs,
    updateFoodType,
    disableUpdateButton,
    inputsErrors
  } = useUpdateFoodsType()

  const {
    updateFoodTypesSuccess,
    updateFoodTypesIsLoading
  } = useSelector((state: RootState) => state.foods)

  return <Form formTitle="Actualizar tipo de comida">
      <Input
        id="update_food_type"
        name="update_food_type"
        label="Tipo de comida"
        value={inputsData.update_food_type}
        onChange={onChange}
        inputInvalid={inputsErrors.update_food_type}
        style={{ textTransform: 'capitalize' }}
        acceptanceCriteria="Solo letras y espacios"
        pattern="^[\p{L}\s]+$"
        minLength={2}
      />
      <ButtonsUpdate
        buttonContinueProps={{
          disabled: disableUpdateButton,
          onClick: updateFoodType
        }}
        buttonRestartProps={{
          disabled: disableRestartButton,
          onClick: restartInputs
        }}
      />

      {updateFoodTypesIsLoading &&
        <LoadingSpinner size="small"
      />}
      <RequestResultStyles
        hidden={!updateFoodTypesSuccess}
        isError={false}
      >
        Tipo de comida actualizada
      </RequestResultStyles>
    </Form>
}

export default UpdateFoodsType
