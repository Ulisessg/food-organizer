/* eslint-disable camelcase */
import { type AppDispatch, type RootState } from 'redux/store'
import {
  createPurchasePlaceThunk,
  restartPurchasePlacePostStateThunk
} from 'redux/slices/purchasePlacesSlice'
import { useDispatch, useSelector } from 'react-redux'
import { type RefObject } from 'react'
import transformPostData from 'utils/transformPostData'
import { useInputs } from 'd-system'
import useValueIsRepeated from 'hooks/useValueIsRepeated'

// eslint-disable-next-line max-lines-per-function, max-statements
const useCreatePurchasePlace = (
  detailsElement: RefObject<HTMLDetailsElement>,
  formElement: RefObject<HTMLFormElement>
): UseCreatePurchasePlaceReturn => {
  const purchasePlacesData = useSelector((state: RootState) => state.purchasePlaces)
  const dispatch: AppDispatch = useDispatch()
  const { isRepeated: ppIsRepeated, searchIsRepeated: searchPpIsRepeated } = useValueIsRepeated()
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
        purchasePlacesData.purchasePlaces,
        'name'
        , ev.currentTarget.value
      )
    }
  }

  const createPurchasePlace: UseCreatePurchasePlaceReturn['createPurchasePlace'] = async () => {
    if (inputsErrors.p_place_name) return
    let address = null
    if (inputsData.pp_address.length > 0) {
      address = inputsData.pp_address
    }
    // Dispatch pp creation
    await dispatch(createPurchasePlaceThunk(transformPostData({
      address,
      name: inputsData.p_place_name
    })))
    // Dispatch reset post status
    formElement.current?.reset()
    restartInputs('all')
    detailsElement.current?.focus()
    await dispatch(restartPurchasePlacePostStateThunk())
  }

  return {
    createPurchasePlace,
    enableButton:
    (!inputsErrors.p_place_name && inputsData.p_place_name.length >= 2) ||
     (purchasePlacesData.postPPIsLoading && !purchasePlacesData.postPPEnd),
    inputsData,
    inputsErrors,
    onBlur,
    onChange,
    purchasePlaceIsrepeated: ppIsRepeated
  }
}

interface UseCreatePurchasePlaceReturn {
  inputsData: Record<string, string>
  inputsErrors: Record<string, boolean>
  onChange: ReturnType<typeof useInputs>['onChange']
  onBlur: ReturnType<typeof useInputs>['onBlur']
  enableButton: boolean
  createPurchasePlace: () => Promise<void>
  purchasePlaceIsrepeated: boolean
}

export default useCreatePurchasePlace
