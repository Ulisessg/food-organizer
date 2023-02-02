/* eslint-disable max-lines-per-function */
import { Button, Form, Input, LoadingSpinner } from 'd-system'
import React, {
  type FC,
  Fragment, useContext, useRef
} from 'react'
import AlertMessage from 'components/common/RequestResultStyles'
import ErrorMessage from 'components/common/ErrorMessage'
import { LoadingSpinnerContainer } from 'components/common/FormInDetailsStyles'
import Select from 'components/common/Select'
import { UnitsOfMeasureContext } from 'context/unitsOfMeasureContext'
import useCreateUnitsOfMeasure from 'hooks/components/useCreateUnitsOfMeasure'

const CreateUnitsOfMeasureForm: FC = () => {
  const formRef = useRef<HTMLFormElement>(null)
  const uomContext = useContext(UnitsOfMeasureContext)
  const {
    abbreviationIsRepeated, disableButton,
    handleChange,
    inputsData,
    inputsErrors,
    onBlur,
    requestInit,
    sendUom,
    showRequestErrorMessage,
    showSuccessMessage,
    uomIsRepeated
  } = useCreateUnitsOfMeasure(formRef)
  return <>
  <Form formTitle="Crear unidad de medida" ref={formRef}>
    <Input
      id="uom_name"
      inputMode="text"
      label="Nombre de la unidad de medida"
      acceptanceCriteria="Solo letras y espacios"
      name="uom_name"
      type="text"
      pattern="^[\p{L}\s]+$"
      minLength={1}
      maxLength={20}
      onChange={handleChange}
      value={inputsData.uom_name}
      required
      onBlur={onBlur}
      style={{ textTransform: 'capitalize' }}
      inputInvalid={(uomIsRepeated || inputsErrors.uom_name)}
    />
    <Input
      id="uom_abbreviation"
      inputMode="text"
      label="Abreviación de la unidad de medida"
      acceptanceCriteria="Solo letras y espacios"
      name="abbreviation"
      type="text"
      pattern="^[\p{L}\s]+$"
      minLength={1}
      maxLength={5}
      onChange={handleChange}
      value={inputsData.abbreviation}
      inputInvalid={(abbreviationIsRepeated || inputsErrors.abbreviation) }
      required
      onBlur={onBlur}
      style={{ textTransform: 'capitalize' }}
    />
      {uomContext.uomtIsLoading && <LoadingSpinner size="large" />}
      {uomContext.errorGettingUomt.error && <ErrorMessage
      message="Ocurrió un error obteniendo los tipo de unidad de medida"
      action="Intenta de nuevo más tarde" />}
      {(!uomContext.errorGettingUomt.error && !uomContext.uomtIsLoading) && <>
        <Select
          labelText="Selecciona a que tipo de unidad de medida pertenece"
          id="create_uomt_select"
          name="select_uomt"
          onChange={handleChange}
          value={inputsData.select_uomt}
          required
        >
          {uomContext.unitsOfMeasureTypes.map(({ id, name }) => <Fragment key={id}>
            <option value={name}>{name}</option>
          </Fragment>)}
        </Select>
      </>}
    <Button
      colorMessage="continue"
      size="100%"
      type="button"
      text="Crear unidad de medida"
      disabled={disableButton || uomIsRepeated || abbreviationIsRepeated}
      onClick={sendUom}
    />
    {requestInit &&
    <LoadingSpinnerContainer>
      <LoadingSpinner size="large" />
    </LoadingSpinnerContainer>
    }
    {/* Request error */}
    <AlertMessage
      hidden={!showRequestErrorMessage}
      aria-hidden={!showRequestErrorMessage}
      isError={true}
      aria-live="assertive"
      role="alert"
    >
      Error creando la unidad de medida, intenta de nuevo más tarde
    </AlertMessage>
    {/* Request success */}
    <AlertMessage
      hidden={!showSuccessMessage}
      aria-hidden={!showSuccessMessage}
      isError={false}
      aria-live="assertive"
      role="alert"
    >
      Unidad de medida creada
    </AlertMessage>
    {/* Uom name repeated */}
    <AlertMessage
      hidden={!uomIsRepeated}
      isError={true}
      aria-hidden={!uomIsRepeated}
      aria-live="assertive"
      role="alert"
    >
      {uomIsRepeated && 'Esa unidad de medida ya existe'}
    </AlertMessage>
    {/* Uom abbreviation repeated */}
    <AlertMessage
      hidden={!abbreviationIsRepeated}
      isError={true}
      aria-hidden={!abbreviationIsRepeated}
      aria-live="assertive"
      role="alert"
    >
      {abbreviationIsRepeated && 'Esa abbreviación ya existe'}
    </AlertMessage>
  </Form>
</>
}

export default CreateUnitsOfMeasureForm
