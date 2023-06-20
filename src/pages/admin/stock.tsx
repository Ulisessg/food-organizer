import { type AppDispatch, type RootState } from 'redux/store'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CreateIngredientStock from 'components/web/CreateIngredientStock'
import DisplayIngredientsStock from 'components/web/DisplayIngredientsStock'
import ErrorMessage from 'components/web/common/ErrorMessage'
import Head from 'next/head'
import { LoadingSpinner } from 'd-system'
import type { NextPage } from 'next'
import Title from 'components/web/common/Title'
import
getIngredientStockElectronCallback
  from 'redux/slices/ingredientsStockSlice/callbacks/electron/getIngredientStockElectronCallback'
import { getIngredientsStockThunk } from 'redux/slices/ingredientsStockSlice/thunks'

const IngredientsStock: NextPage = () => {
  const ingredientsStockData = useSelector((state: RootState) => state.ingredientsStock)
  const dispatch: AppDispatch = useDispatch()

  useEffect(
    () => {
      void dispatch(getIngredientsStockThunk(getIngredientStockElectronCallback))
    },
    [dispatch]
  )
  if (ingredientsStockData.getRequestIsLoading) {
    return <LoadingSpinner size="large"/>
  }
  if (ingredientsStockData.getRequestError) {
    return <ErrorMessage
    message="Ocurrió un error obteniendo los ingredientes disponibles"
    action="intenta de nuevo mas tarde" />
  }
  return <>
  <Head>
    <title>Ingredientes disponibles</title>
  </Head>
  <Title>Administrar ingredientes disponibles</Title>
  <CreateIngredientStock />
  <p>Para eliminar un ingrediente disponible pon la cantidad en 0</p>
  <DisplayIngredientsStock />
</>
}

export default IngredientsStock
