import { Form, Input, LoadingSpinner } from 'd-system'
import React, { type FC } from 'react'
import ButtonsUpdate from '../../common/ModalUpdateData/ButtonsUpdate'
import { LoadingSpinnerContainer } from '../../common/FormInDetailsStyles'
import RequestResultStyles from '../../common/RequestResultStyles'
import { type RootState } from 'redux/store'
import { type units_of_measure_types } from 'controllers/dbTablesTypes'
import { useSelector } from 'react-redux'
import useUpdateUnitOfMeasureType from 'hooks/components/unitsOfMeasure/useUpdateUnitOfMeasureType'

const UpdateUnitOfMeasureType: FC<UpdateUnitOfMeasureTypeProps> = (props) => {
  const {
    updateUomtIsLoading,
    updateUomtSuccess,
    updateUomtError
  } = useSelector((state: RootState) => state.unitsOfMeasure)

  const {
    inputsData,
    inputsErrors,
    onChange,
    onBlur,
    update,
    reset,
    nameIsRepeated,
    disableUpdateButton,
    disableRestartButton
  } = useUpdateUnitOfMeasureType({
    groupingElementIndex: props.groupingElementIndex,
    uomT: {
      id: props.id,
      name: props.name
    },
    uomtExistent: props.uomtExistent
  })

  return <Form formTitle="Tipo de unidad de medida" onSubmit={update}>
    <Input
      id={props.name}
      label="Nombre"
      name="name"
      required
      onChange={onChange}
      onBlur={onBlur}
      value={inputsData.name}
      minLength={2}
      style={{
        textTransform: 'capitalize'
      }}
      inputInvalid={inputsErrors.name || nameIsRepeated}
      type="text"
      pattern="^[\p{L}\s]+$"
      acceptanceCriteria="Solo letras y espacios"
    />
    <RequestResultStyles
      hidden={!nameIsRepeated}
      isError={true}
      style={{ marginBottom: 24 }}
    >
      Ese tipo de unidad de medida ya existe
    </RequestResultStyles>
    <ButtonsUpdate
      buttonContinueProps={{
        disabled: disableUpdateButton,
        onClick: update
      }}
      buttonRestartProps={{
        disabled: disableRestartButton,
        onClick: reset
      }}
    />
    <RequestResultStyles
      hidden={!updateUomtSuccess}
      isError={false}
    >
      Tipo de unidad de medida actualizada
    </RequestResultStyles>
    <RequestResultStyles
      hidden={!updateUomtError}
      isError={true}
    >
      Ocurrio un error actualizando el tipo de unidad de medida
    </RequestResultStyles>
    {updateUomtIsLoading &&
      <LoadingSpinnerContainer>
        <LoadingSpinner
        size="small"
        />
      </LoadingSpinnerContainer>
    }
  </Form>
}

interface UpdateUnitOfMeasureTypeProps extends units_of_measure_types {
  uomtExistent: units_of_measure_types[]
  groupingElementIndex: number
}

export default UpdateUnitOfMeasureType
