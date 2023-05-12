import { Button, Form, Input, LoadingSpinner } from 'd-system'
import React, { type FC, useRef } from 'react'
import Details from 'components/web/common/Details'
import { LoadingSpinnerContainer } from './common/FormInDetailsStyles'
import RequestResultStyles from './common/RequestResultStyles'
import { type RootState } from 'redux/store'
import useCreatePurchasePlace from 'hooks/components/useCreatePurchasePlace'
import { useSelector } from 'react-redux'

// eslint-disable-next-line max-lines-per-function
const CreatePurchasePlace: FC = () => {
  const purchasePlacesData = useSelector((state: RootState) => state.purchasePlaces)
  const detailsRef = useRef<HTMLDetailsElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const {
    createPurchasePlace,
    enableButton,
    inputsData,
    inputsErrors,
    onBlur,
    onChange,
    purchasePlaceIsrepeated
  } = useCreatePurchasePlace(
    detailsRef,
    formRef
  )
  return <>
  <Details summary="Crear lugar de compra" ref={detailsRef as any}>
  <Form formTitle="Crear lugar de compra" ref={formRef}>
    <Input
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
    <Input
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
      onClick={createPurchasePlace}
    />
    {purchasePlacesData.postPPIsLoading && <LoadingSpinnerContainer>
      <LoadingSpinner
        size="large"
      />
    </LoadingSpinnerContainer>}
    {/* Error */}
    <RequestResultStyles
      hidden={!purchasePlacesData.postPPError}
      isError={true}>
        Error creando el lugar de compra, intenta de nuevo mas tarde :).
    </RequestResultStyles>
    {/* Success */}
    <RequestResultStyles
      hidden={!purchasePlacesData.postPPSuccess}
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
