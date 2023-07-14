import { Form, Input, Select } from 'd-system'
import React, { type FC, Fragment } from 'react'
import ButtonsUpdate from '../common/ModalUpdateData/ButtonsUpdate'
import RequestResultStyles from '../common/RequestResultStyles'
import { type RootState } from 'redux/store'
import {
  type TGetUnitsOfMeasureType
} from 'controllers/food_organizer_crud/sql/unitsOfMeasureTypes/types'
import randomId from 'utils/randomId'
import { type units_of_measure } from 'controllers/food_organizer_crud/dbTablesTypes'
import { useSelector } from 'react-redux'
import useUpdateUnitsOfMeasure from 'hooks/components/unitsOfMeasure/useUpdateUnitsOfMeasure'

const UpdateUnitsOfMeasure: FC<UpdateUnitsOfMeasureProps> = (props) => {
  const {
    updateUomError,
    updateUomSuccess
  } = useSelector((state: RootState) => state.unitsOfMeasure)

  const {
    onChange,
    onBlur,
    inputsData,
    inputsErrors,
    disableRestartButton,
    disableUpdateButton,
    reset,
    nameIsRepeated,
    abbreviationIsRepeated,
    update,
    isCurrentUomUpdating
  } = useUpdateUnitsOfMeasure({
    abbreviation: props.abbreviation,
    elementIndex: props.elementIndex,
    groupingElementIndex: props.groupingElementIndex,
    name: props.name,
    unitsOfMeasure: props.unitsOfMeasure,
    uomId: props.id,
    uomtId: `${props.uomt_id}`
  })

  return <Form formTitle="Unidad de medida">
    <Input
      id={props.name}
      label="Nombre"
      name="name"
      onChange={onChange}
      onBlur={onBlur}
      value={inputsData.name}
      style={{ textTransform: 'capitalize' }}
      minLength={2}
      required
      inputInvalid={inputsErrors.name || nameIsRepeated}
      type="text"
      pattern="^[\p{L}\s]+$"
      acceptanceCriteria="Solo letras y espacios"
    />
    <RequestResultStyles
      hidden={!nameIsRepeated}
      isError={true}
    >
      Ese nombre ya existe
    </RequestResultStyles>
    <Input
      id={props.abbreviation}
      label="Abreviación"
      name="abbreviation"
      required
      onChange={onChange}
      onBlur={onBlur}
      value={inputsData.abbreviation}
      style={{ textTransform: 'capitalize' }}
      minLength={1}
      inputInvalid={inputsErrors.abbreviation || abbreviationIsRepeated}
      type="text"
      pattern="^[\p{L}\s]+$"
      acceptanceCriteria="Solo letras y espacios"
    />
    <RequestResultStyles
      hidden={!abbreviationIsRepeated}
      isError={true}
    >
      Esa abbreviacion ya existe
    </RequestResultStyles>
    <Select
      id={`${props.uomt_id}${props.abbreviation}`}
      label="Selecciona el tipo de unidad de medida"
      name="uomt"
      onChange={onChange}
      value={inputsData.uomt}
    >
      {props.unitsOfMeasureTypes.map(({ id, name }) => <Fragment key={randomId(name)}>
        <option value={id}>{name}</option>
      </Fragment>)}
    </Select>

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
      hidden={!updateUomError || !isCurrentUomUpdating}
      isError
    >
      Ocurrió un error actualizando la unidad de medida
    </RequestResultStyles>
    <RequestResultStyles
      hidden={!updateUomSuccess || !isCurrentUomUpdating}
      isError={false}
    >
      Unidad de medida actualizada
    </RequestResultStyles>
  </Form>
}

const UpdateUnitsOfMeasureWrapper: FC<UpdateUnitsOfMeasureProps> = (props) => {
  if (props.name === '') {
    return []
  }
  return <UpdateUnitsOfMeasure {...props} />
}

interface UpdateUnitsOfMeasureProps extends units_of_measure {
  unitsOfMeasureTypes: TGetUnitsOfMeasureType
  unitsOfMeasure: RootState['unitsOfMeasure']['uom']
  elementIndex: number
  groupingElementIndex: number
}

export default UpdateUnitsOfMeasureWrapper
