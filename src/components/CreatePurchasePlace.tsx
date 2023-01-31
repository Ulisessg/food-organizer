import { Button, Form, LoadingSpinner, TextInput } from 'd-system'
import React, { type FC, useRef } from 'react'
import Details from 'components/common/Details'
import { LoadingSpinnerContainer } from './common/FormInDetailsStyles'
import RequestResultStyles from './common/RequestResultStyles'
import useCreatePurchasePlace from 'hooks/components/useCreatePurchasePlace'

// eslint-disable-next-line max-lines-per-function
const CreatePurchasePlace: FC = () => {
  const detailsRef = useRef<HTMLDetailsElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const {
    enableButton,
    inputsData,
    inputsErrors,
    onBlur,
    onChange,
    postPurchasePlace,
    purchasePlaceIsrepeated,
    requestError,
    requestInit,
    requestSuccess
  } = useCreatePurchasePlace(
    detailsRef,
    formRef
  )
  return <>
  <Details summary="Crear lugar de compra" ref={detailsRef as any}>
  <Form formTitle="Crear lugar de compra" ref={formRef}>
    <TextInput
      id="p_place_name"
      inputMode="text"
      label="Nombre del luugar de compra"
      name="p_place_name"
      type="text"
      pattern="^[\p{L}\s]+$"
      required
      acceptanceCriteria="Solo letras y espacios"
      inputInvalid={inputsErrors.p_place_name || purchasePlaceIsrepeated}
      minLength={2}
      value={inputsData.p_place_name}
      onBlur={onBlur}
      onChange={onChange}
      style={{ textTransform: 'capitalize' }}
      />
    <TextInput
      id="pp_address"
      inputMode="text"
      label="Dirección"
      name="pp_address"
      type="text"
      acceptanceCriteria="(Opcional)"
      value={inputsData.pp_address}
      onBlur={onBlur}
      onChange={onChange}
    />
    <Button
      colorMessage="continue"
      size="100%"
      text="Añadir nueva dirección"
      type="button"
      disabled={!enableButton || purchasePlaceIsrepeated}
      onClick={postPurchasePlace}
    />
    {requestInit && <LoadingSpinnerContainer>
      <LoadingSpinner
        size="large"
      />
    </LoadingSpinnerContainer>}
    {/* Error */}
    <RequestResultStyles
      hidden={!requestError}
      isError={true}>
        Error creando el lugar de compra, intenta de nuevo mas tarde :).
    </RequestResultStyles>
    {/* Success */}
    <RequestResultStyles
      hidden={!requestSuccess}
      isError={false}>
        Lugar de compra creado!.
    </RequestResultStyles>
    {/* Name repeated */}
    <RequestResultStyles
      hidden={!purchasePlaceIsrepeated}
      isError={true}>
        Ese lugar de compra ya existe!
    </RequestResultStyles>
  </Form>
  </Details>
</>
}

export default CreatePurchasePlace
