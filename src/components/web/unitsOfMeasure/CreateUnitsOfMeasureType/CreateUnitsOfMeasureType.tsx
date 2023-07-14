/* eslint-disable max-lines-per-function */
/* eslint-disable max-statements */
import { Button, Form, Input, LoadingSpinner } from 'd-system'
import React, {
  type FC,
  useRef
} from 'react'
import Details from 'components/web/common/Details'
import { LoadingSpinnerContainer } from 'components/web/common/FormInDetailsStyles'
import RequestResultStyles from 'components/web/common/RequestResultStyles'
import { type RootState } from 'redux/store'
import useCreateUnitsOfMeasureTypeForm from 'hooks/components/useCreateUnitsOfMeasureTypeForm'
import { useSelector } from 'react-redux'

const CreateUnitsOfMeasureTypeForm: FC = () => {
  const unitsOfMeasureData = useSelector((state: RootState) => state.unitsOfMeasure)
  const formRef = useRef<HTMLFormElement>(null)
  const detailsRef = useRef<HTMLDetailsElement>(null)
  const {
    disableButton,
    handleChange,
    inputsData,
    inputsErrors,
    isRepeated,
    onBlur,
    createUomt
  } = useCreateUnitsOfMeasureTypeForm(
    formRef,
    detailsRef
  )
  return <Details summary="Crear tipo de unidad de medida" ref={detailsRef as any}>
  <Form formTitle="Crear tipo de unidad de medida" onSubmit={createUomt as any} ref={formRef}>
    <Input
      id="create_uomt_uom_name"
      inputMode="text"
      label="Nombre del tipo de unidad de medida:"
      name="uomt"
      type="text"
      required
      pattern="^[\p{L}\s]+$"
      acceptanceCriteria="Solo letras y espacios"
      maxLength={20}
      minLength={1}
      onChange={handleChange as any}
      style={{ textTransform: 'capitalize' }}
      inputInvalid={inputsErrors.uomt || isRepeated}
      value={inputsData.uomt}
      onBlur={onBlur}
    />
    <Button
      colorMessage="continue"
      size="100%"
      type="button"
      text="Crear tipo de unidad de medida"
      disabled={disableButton}
      onClick={createUomt as any}
    />

    {unitsOfMeasureData.dataIsLoading && <LoadingSpinnerContainer>
      <LoadingSpinner
        size="large"
      />
    </LoadingSpinnerContainer>}

    <RequestResultStyles
      hidden={!unitsOfMeasureData.postUomtError}
      isError={true}
    >
        Ocurrió un error creando el tipo de unidad de medida
    </RequestResultStyles>

    <RequestResultStyles
      hidden={!unitsOfMeasureData.postUomtSuccess}
      isError={false}
    >
      Tipo de unidad de medida creado
    </RequestResultStyles>

    <RequestResultStyles
      isError={true}
      hidden={!isRepeated}
    >
      Ese tipo de unidad ya existe
    </RequestResultStyles>

  </Form>
  </Details>
}

export default CreateUnitsOfMeasureTypeForm
