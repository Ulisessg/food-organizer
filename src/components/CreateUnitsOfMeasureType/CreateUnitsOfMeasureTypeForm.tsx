/* eslint-disable max-lines-per-function */
/* eslint-disable max-statements */
import { Button, Form, LoadingSpinner, TextInput, useInputs } from 'd-system'
import React, { ChangeEvent, FC, FormEvent, MouseEvent, useContext, useState } from 'react'
import usePostRequest, { CallbacksResponse } from 'hooks/usePostRequest'
import type { GetUOMT } from 'controllers/food_organizer_crud/unitsOfMeasureTypeCRUD'
import { LoadingSpinnerContainer } from 'components/common/FormInDetailsStyles'
import RequestResultStyles from 'components/common/RequestResultStyles'
import { UnitsOfMeasureContext } from 'context/unitsOfMeasureContext'
import transformPostData from 'utils/transformPostData'
import useValueIsRepeated from 'hooks/useValueIsRepeated'

const CreateUnitsOfMeasureTypeForm: FC = () => {
  const { inputsData, inputsErrors, onBlur, onChange, restartInputs } = useInputs(
    {
      uomt: ''
    },
    true
  )
  const uomContext = useContext(UnitsOfMeasureContext)
  const { error, postData, requestEnd, requestInit, response } =
  usePostRequest<UomtDataRequest, GetUOMT[0]>(
    '/api/uomt',
    { method: 'POST' }
  )

  const [
    hideRequestMessage,
    setHideRequestMessage
  ] = useState<boolean>(false)

  const [
    disableButton,
    setDisableButton
  ] = useState<boolean>(true)
  const { isRepeated, searchIsRepeated } = useValueIsRepeated<GetUOMT[0]>()

  const handleChange = (ev: ChangeEvent<HTMLInputElement>): void => {
    onChange(ev)
    const { value } = ev.currentTarget
    if (ev.currentTarget.validity.valid) {
      setDisableButton(false)
    } else {
      setDisableButton(true)
      setHideRequestMessage(true)
    }
    searchIsRepeated(
      uomContext.unitsOfMeasureTypes,
      'name',
      value
    )
    ev.currentTarget.checkValidity()
    ev.currentTarget.reportValidity()
  }

  const updateUomt = (res: CallbacksResponse<GetUOMT[0]>): void => {
    uomContext.updateUomt(res.data?.data as GetUOMT[0])
  }

  const sendUomt = (ev: MouseEvent<HTMLButtonElement> | FormEvent<HTMLFormElement>): void => {
    ev.preventDefault()
    if (ev.currentTarget.form?.checkValidity() === true) {
      setHideRequestMessage(false)
      const data = transformPostData({
        name: inputsData.uomt
      })
      postData(
        data,
        updateUomt
      )
    }
    restartInputs('uomt')
    setDisableButton(true)
    ev.currentTarget.parentNode?.querySelector('input')?.focus()
    setTimeout(
      () => {
        setHideRequestMessage(true)
      },
      1500
    )
  }

  return <>
  <Form formTitle="Crear tipo de unidad de medida" onSubmit={sendUomt as any}>
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

interface UomtDataRequest {
  creation_date: string
  name: string
}

export default CreateUnitsOfMeasureTypeForm
