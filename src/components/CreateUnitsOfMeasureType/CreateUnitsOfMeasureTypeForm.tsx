import { Button, Form, LoadingSpinner, TextInput } from 'd-system'
import React, { ChangeEvent, FC, MouseEvent, useState } from 'react'
import styled from 'styled-components'
import transformPostData from 'utils/transformPostData'
import usePostRequest from 'hooks/usePostRequest'

// eslint-disable-next-line max-lines-per-function
const CreateUnitsOfMeasureTypeForm: FC = () => {
  const { error, postData, requestEnd, requestInit, response } =
  usePostRequest<UomtDataRequest>(
    '/api/uomt',
    { method: 'POST' }
  )

  const [
    hideRequestMessage,
    setHideRequestMessage
  ] = useState<boolean>(false)
  const [
    uomt,
    setUomt
  ] = useState<string>('')
  const [
    disableButton,
    setDisableButton
  ] = useState<boolean>(true)

  const handleChange = (ev: ChangeEvent<HTMLInputElement>): void => {
    const { value } = ev.currentTarget
    setUomt(value)
    if (ev.currentTarget.validity.valid) {
      setDisableButton(false)
    } else {
      setDisableButton(true)
      setHideRequestMessage(true)
    }
  }

  const sendUomt = (ev: MouseEvent<HTMLButtonElement>): void => {
    if (ev.currentTarget.form?.checkValidity() === true) {
      setHideRequestMessage(false)
      const data = transformPostData({
        name: uomt
      })
      postData(data)
    }
  }

  return <>
  <Form formTitle="Crear tipo de unidad de medida">
    <TextInput
      id="create_uomt_uom_name"
      inputMode="text"
      label="Nombre del tipo de unidad de medida:"
      name="create_uomt_uom_name"
      type="text"
      required
      pattern="^[\p{L}\s]+$"
      acceptanceCriteria="Solo letras y espacios"
      maxLength={20}
      minLength={1}
      value={uomt}
      onChange={handleChange}
      style={{ textTransform: 'capitalize' }}
    />
    <Button
      colorMessage="continue"
      size="100%"
      type="button"
      text="Crear tipo de unidad de medida"
      disabled={disableButton || requestInit}
      onClick={sendUomt}
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
      >
        {requestEnd && response}
      </RequestResultStyles>
  </Form>
</>
}

const RequestResultStyles = styled.span<{ isError: boolean }>`
  color: ${({ theme, isError }) => {
    if (isError) return theme.colors.error
    return theme.colors.light2
  }};
  font-size: 20px;
  text-align: center;
  margin-top: 40px;
`

const LoadingSpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  margin-top: 40px;
`

interface UomtDataRequest {
  creation_date: string
  name: string
}

export default CreateUnitsOfMeasureTypeForm
