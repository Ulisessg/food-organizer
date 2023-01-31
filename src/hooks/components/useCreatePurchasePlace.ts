/* eslint-disable camelcase */
import { type RefObject, useContext, useEffect, useState } from 'react'
import { IngredientsContext } from 'context/ingredientsContext'
import { type purchase_places } from '@prisma/client'
import transformPostData from 'utils/transformPostData'
import { useInputs } from 'd-system'
import usePostRequest from 'hooks/usePostRequest'
import useValueIsRepeated from 'hooks/useValueIsRepeated'

// eslint-disable-next-line max-lines-per-function, max-statements
const useCreatePurchasePlace = (
  detailsElement: RefObject<HTMLDetailsElement>,
  formElement: RefObject<HTMLFormElement>
): UseCreatePurchasePlaceReturn => {
  const ingredientsContext = useContext(IngredientsContext)
  const {
    postData,
    requestInit
  } = usePostRequest<
  Omit<purchase_places, 'id' | 'creation_date'>, purchase_places>('/api/purchase')
  const { isRepeated: ppIsRepeated, searchIsRepeated: searchPpIsRepeated } = useValueIsRepeated()
  const [
    requestError,
    setRequestError
  ] = useState<boolean>(false)
  const [
    requestEnd,
    setRequestEnd
  ] = useState<boolean>(false)
  const [
    requestSuccess,
    setRequestSuccess
  ] = useState<boolean>(false)
  const [
    restarForm,
    setRestartForm
  ] = useState<boolean>(false)
  const { inputsData, onChange: inputsOnChange, onBlur, inputsErrors, restartInputs } = useInputs(
    {
      p_place_name: '',
      pp_address: ''
    },
    true
  )

  const onChange: ReturnType<typeof useInputs>['onChange'] = (ev) => {
    inputsOnChange(ev)
    if (ev.currentTarget.name === 'p_place_name') {
      searchPpIsRepeated(
        ingredientsContext.purchasePlaces,
        'name'
        , ev.currentTarget.value
      )
    }
  }

  const postPurchasePlace: UseCreatePurchasePlaceReturn['postPurchasePlace'] = () => {
    if (inputsErrors.p_place_name) return
    let address = null
    if (inputsData.pp_address.length > 0) {
      address = inputsData.pp_address
    }

    postData(transformPostData({
      address,
      name: inputsData.p_place_name
    })).then((res) => {
      ingredientsContext.updatePurchasePlaces(res.data.data as purchase_places)
      setRequestError(false)
      setRequestEnd(true)
      setRequestSuccess(true)
      setRestartForm(true)
    })
      .catch(() => {
        setRequestError(true)
        setRequestEnd(true)
        setRequestSuccess(false)
      })
  }

  useEffect(
    () => {
      setTimeout(
        () => {
          if (!restarForm) return
          // Reset states
          setRequestEnd(false)
          setRequestError(false)
          setRequestSuccess(false)
          formElement.current?.reset()
          setRestartForm(false)
          restartInputs('all')
          // Focus
          detailsElement.current?.removeAttribute('open')
          detailsElement.current?.focus()
        },
        3000
      )
    },
    [
      detailsElement,
      formElement,
      restarForm,
      restartInputs
    ]
  )

  return {
    enableButton:
    (!inputsErrors.p_place_name && inputsData.p_place_name.length >= 2) ||
     (requestInit && !requestEnd),
    inputsData,
    inputsErrors,
    onBlur,
    onChange,
    postPurchasePlace,
    purchasePlaceIsrepeated: ppIsRepeated,
    requestError,
    requestInit,
    requestSuccess
  }
}

interface UseCreatePurchasePlaceReturn {
  inputsData: Record<string, string>
  inputsErrors: Record<string, boolean>
  onChange: ReturnType<typeof useInputs>['onChange']
  onBlur: ReturnType<typeof useInputs>['onBlur']
  enableButton: boolean
  postPurchasePlace: () => void
  requestSuccess: boolean
  requestError: boolean
  requestInit: boolean
  purchasePlaceIsrepeated: boolean
}

export default useCreatePurchasePlace
