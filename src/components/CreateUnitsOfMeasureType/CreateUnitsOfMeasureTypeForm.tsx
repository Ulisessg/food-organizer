/* eslint-disable max-lines-per-function */
/* eslint-disable max-statements */
import { Button, Form, LoadingSpinner, TextInput, useInputs } from 'd-system'
import React, {
  type ChangeEvent,
  type FC, type FormEvent,
  type MouseEvent,
  useContext,
  useRef,
  useState
} from 'react'
import type { GetUOMT } from 'controllers/food_organizer_crud/unitsOfMeasureTypeCRUD'
import { LoadingSpinnerContainer } from 'components/common/FormInDetailsStyles'
import RequestResultStyles from 'components/common/RequestResultStyles'
import { UnitsOfMeasureContext } from 'context/unitsOfMeasureContext'
import transformPostData from 'utils/transformPostData'
import usePostRequest from 'hooks/usePostRequest'
import useValueIsRepeated from 'hooks/useValueIsRepeated'

const CreateUnitsOfMeasureTypeForm: FC = () => {
  const formRef = useRef<HTMLFormElement>(null)
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

  const updateUomt = (data: GetUOMT[0]): void => {
    uomContext.updateUomt(data)
  }

  const sendUomt = (ev: MouseEvent<HTMLButtonElement> | FormEvent<HTMLFormElement>): void => {
    ev.preventDefault()
    if (ev.currentTarget.form?.checkValidity() === true) {
      setHideRequestMessage(false)
      const data = transformPostData({
        name: inputsData.uomt
      })
      postData(data).then((res) => {
        updateUomt(res.data.data as GetUOMT[0])
      })
        .finally(() => {
          restartInputs('uomt')
          setDisableButton(true)
          const button = formRef.current?.querySelector('button') as HTMLButtonElement
          button.blur()
          const summary = formRef.current?.parentNode?.querySelector('summary')
          summary?.focus()

          setTimeout(
            () => {
              setHideRequestMessage(true)
            },
            1500
          )
        })
    }
  }

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

interface UomtDataRequest {
  creation_date: string
  name: string
}

export default CreateUnitsOfMeasureTypeForm
