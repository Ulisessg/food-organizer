/* eslint-disable max-statements */
/* eslint-disable camelcase */
/* eslint-disable max-lines-per-function */
/* eslint-disable @typescript-eslint/naming-convention */
import { Button, Form, LoadingSpinner, TextInput, useInputs } from 'd-system'
import React, {
  type ChangeEvent,
  type FC,
  Fragment, type MouseEvent, useContext, useRef, useState
} from 'react'
import AlertMessage from 'components/common/RequestResultStyles'
import ErrorMessage from 'components/common/ErrorMessage'
import { type GetUOM } from 'controllers/food_organizer_crud/unitsOfMeasureCRUD'
import { LoadingSpinnerContainer } from 'components/common/FormInDetailsStyles'
import Select from 'components/common/Select'
import { UnitsOfMeasureContext } from 'context/unitsOfMeasureContext'
import { defaultSelectValue } from 'utils/constants'
import transformPostData from 'utils/transformPostData'
import type { units_of_measure } from '@prisma/client'
import usePostRequest from 'hooks/usePostRequest'
import useValueIsRepeated from 'hooks/useValueIsRepeated'

const CreateUnitsOfMeasureForm: FC = () => {
  const formRef = useRef<HTMLFormElement>(null)
  const uomContext = useContext(UnitsOfMeasureContext)
  const {
    isRepeated: uomIsRepeated,
    searchIsRepeated: seachUomIsRepeated
  } = useValueIsRepeated<GetUOM[0]['uom'][0]>()
  const {
    isRepeated: abbreviationIsRepeated,
    searchIsRepeated: searchIfAbbreviationIsRepeated
  } = useValueIsRepeated<GetUOM[0]['uom'][0]>()
  const { inputsData, onChange, onBlur, inputsErrors, restartInputs } = useInputs(
    {
      abbreviation: '',
      select_uomt: defaultSelectValue,
      uom_name: ''
    },
    true
  )
  const { postData, requestInit } =
  usePostRequest<Omit<units_of_measure, 'id' | 'creation_date'>, units_of_measure>(
    '/api/uom',
    {
      method: 'POST'
    }
  )
  const [
    disableButton,
    setDisableButton
  ] = useState<boolean>(true)
  const [
    showSuccessMessage,
    setShowSuccessMessage
  ] = useState<boolean>(false)
  const [
    showRequestErrorMessage,
    setShowRequestErrorMessage
  ] = useState<boolean>(false)

  const handleChange = (ev: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    onChange(ev as ChangeEvent<HTMLInputElement>)
    const { form } = ev.currentTarget
    const select = form?.querySelector('select')

    if (form?.checkValidity() === true &&
    select?.value !== 'Selecciona una opcion') {
      setDisableButton(false)
    } else {
      setDisableButton(true)
    }
    if (ev.currentTarget.name === 'uom_name') {
      seachUomIsRepeated(
        uomContext.unitsOfMeasure,
        'name',
        ev.currentTarget.value
      )
    }
    if (ev.currentTarget.name === 'abbreviation') {
      searchIfAbbreviationIsRepeated(
        uomContext.unitsOfMeasure,
        'abbreviation',
        ev.currentTarget.value
      )
    }
  }

  const sendUom = (ev: MouseEvent<HTMLButtonElement>): void => {
    if (ev.currentTarget.form?.checkValidity() === true) {
      const uomtId =
      uomContext.unitsOfMeasureTypes.find((el) => el.name === inputsData.select_uomt)?.id as number
      const requestData = transformPostData({
        abbreviation: inputsData.abbreviation,
        name: inputsData.uom_name,
        uomt_id: uomtId
      })
      postData(requestData).then((res) => {
        setShowSuccessMessage(true)
        restartInputs('all')
        setDisableButton(true)
        uomContext.updateUom(res.data?.data as units_of_measure)
        setTimeout(
          () => {
            setShowSuccessMessage(false)
          },
          1500
        )
      })
        .catch(() => {
          setShowRequestErrorMessage(true)
          setTimeout(
            () => {
              setShowRequestErrorMessage(false)
            },
            1500
          )
        })
        .finally(() => {
          formRef.current?.parentNode?.querySelector('summary')?.focus()
        })
    }
  }

  return <>
  <Form formTitle="Crear unidad de medida" ref={formRef}>
    <TextInput
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
    <TextInput
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
