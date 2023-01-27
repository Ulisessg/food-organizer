/* eslint-disable max-lines-per-function */
/* eslint-disable max-statements */
import { Button, Form, LoadingSpinner, TextInput } from 'd-system'
import React, {
  type FC,
  useRef
} from 'react'
import { LoadingSpinnerContainer } from 'components/common/FormInDetailsStyles'
import RequestResultStyles from 'components/common/RequestResultStyles'
import useCreateUnitsOfMeasureTypeForm from 'hooks/components/useCreateUnitsOfMeasureTypeForm'

const CreateUnitsOfMeasureTypeForm: FC = () => {
  const formRef = useRef<HTMLFormElement>(null)
  const {
    disableButton,
    error,
    handleChange,
    hideRequestMessage,
    inputsData,
    inputsErrors,
    isRepeated,
    onBlur,
    requestEnd,
    requestInit,
    response,
    sendUomt
  } = useCreateUnitsOfMeasureTypeForm(formRef)
  return <>
  <Form formTitle="Crear tipo de unidad de medida" onSubmit={sendUomt as any} ref={formRef}>
    <TextInput
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
      disabled={disableButton || requestInit || isRepeated}
      onClick={sendUomt as any}
    />

    {requestInit && <LoadingSpinnerContainer>
      <LoadingSpinner
        size="large"
      />
    </LoadingSpinnerContainer>}

    <RequestResultStyles
      aria-hidden={hideRequestMessage}
      hidden={hideRequestMessage}
      aria-live="assertive"
      isError={error}
      role="alert"
      >
        {(requestEnd && !error) && 'Tipo de unidad creada'}
        {(requestEnd && error) && response as string}
      </RequestResultStyles>

      <RequestResultStyles
        isError={isRepeated}
        aria-hidden={!isRepeated}
        hidden={!isRepeated}
        aria-live="assertive"
        role="alert"
      >
        {isRepeated && 'Ese tipo de unidad ya existe'}
      </RequestResultStyles>

  </Form>
</>
}

export default CreateUnitsOfMeasureTypeForm
