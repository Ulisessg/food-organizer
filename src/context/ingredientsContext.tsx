/* eslint-disable max-lines-per-function */
/* eslint-disable camelcase */
import { type FC, type ReactNode, createContext, useEffect, useState } from 'react'
import { type ingredients, type purchase_places } from '@prisma/client'
import { type GetIngredients } from 'controllers/food_organizer_crud/ingredientCRUD'
import { type GetPurchasePlaces } from 'controllers/food_organizer_crud/purchasePlaceCRUD'
import { type GetUOM } from 'controllers/food_organizer_crud/unitsOfMeasureCRUD'
import useGetRequest from 'hooks/useGetRequest'

const initialState: IngredientsContextData = {
  errorGettingIngredients: false,
  errorGettingPurchasePlaces: false,
  errorGettingUom: false,
  ingredients: [],
  ingredientsIsLoading: true,
  purchasePlaces: [],
  purchasePlacesIsLoading: true,
  unitsOfMeasure: [],
  uomIsLoading: true,
  updateIngredients: () => {
    //
  },
  updatePurchasePlaces: () => {
    //
  }
}

export const IngredientsContext = createContext<IngredientsContextData>(initialState)

export const IngredientsContextProvider: FC<IngredientsContextProps> = ({ children }) => {
  const {
    data: ingredientsData,
    error: ingredientsError, isLoading: ingredientsIsLoading
  } = useGetRequest<GetIngredients>('/api/ingredient')
  const {
    data: purchasePlacesData,
    error: purchasePlacesError,
    isLoading: purchasePlacesIsLoading
  } = useGetRequest<GetPurchasePlaces>('/api/purchase')
  const {
    data: uomData, error: uomError,
    isLoading: uomIsLoading
  } = useGetRequest<GetUOM>('/api/uom')
  const [
    ingredientsState,
    setIngredientsState
  ] = useState<
  Omit<IngredientsContextData, 'updateIngredients' | 'updatePurchasePlaces'>
  >(initialState)

  const updateIngredients: IngredientsContextData['updateIngredients'] = (ingredient) => {
    //
  }
  const updatePurchasePlaces: IngredientsContextData['updatePurchasePlaces'] = (purchasePlace) => {
    //
  }

  // Ingredients
  useEffect(
    () => {
      if (!ingredientsIsLoading) {
        if (ingredientsError) {
          setIngredientsState((prev) => ({
            ...prev,
            errorGettingIngredients: true,
            ingredientsIsLoading: false
          }))
        } else {
          setIngredientsState((prev) => ({
            ...prev,
            errorGettingIngredients: false,
            ingredients: ingredientsData as GetIngredients,
            ingredientsIsLoading: false
          }))
        }
      }
    },
    [
      ingredientsData,
      ingredientsError,
      ingredientsIsLoading
    ]
  )

  // Purchase places
  useEffect(
    () => {
      if (!purchasePlacesIsLoading) {
        if (purchasePlacesError) {
          setIngredientsState((prev) => ({
            ...prev,
            errorGettingPurchasePlaces: true,
            purchasePlacesIsLoading: false
          }))
          return
        }
        setIngredientsState((prev) => ({
          ...prev,
          errorGettingPurchasePlaces: false,
          purchasePlaces: purchasePlacesData as GetPurchasePlaces,
          purchasePlacesIsLoading: false
        }))
      }
    },
    [
      purchasePlacesData,
      purchasePlacesError,
      purchasePlacesIsLoading
    ]
  )

  // Units of measure
  useEffect(
    () => {
      if (!uomIsLoading) {
        if (uomError) {
          setIngredientsState((prev) => ({
            ...prev,
            errorGettingUom: true,
            uomIsLoading: false
          }))
          return
        }
        setIngredientsState((prev) => ({
          ...prev,
          errorGettingUom: false,
          unitsOfMeasure: uomData as GetUOM,
          uomIsLoading: false
        }))
      }
    },
    [
      uomData,
      uomError,
      uomIsLoading
    ]
  )

  return <IngredientsContext.Provider value={{
    ...ingredientsState,
    updateIngredients,
    updatePurchasePlaces
  }}>
    {children}
  </IngredientsContext.Provider>
}

interface IngredientsContextProps {
  children: ReactNode
}

interface IngredientsContextData {
  errorGettingIngredients: boolean
  errorGettingUom: boolean
  errorGettingPurchasePlaces: boolean
  ingredients: GetIngredients
  ingredientsIsLoading: boolean
  uomIsLoading: boolean
  unitsOfMeasure: GetUOM
  purchasePlaces: GetPurchasePlaces
  purchasePlacesIsLoading: boolean
  updateIngredients: (ingredient: ingredients) => void
  updatePurchasePlaces: (purchasePlace: purchase_places) => void
}
