import CreateIngredientStock from 'components/CreateIngredientStock'
import DisplayIngredientsStock from 'components/DisplayIngredientsStock'
import ErrorMessage from 'components/common/ErrorMessage'
import { GetIngredientStock } from 'controllers/food_organizer_crud/ingredientStockCRUD'
import Head from 'next/head'
import { LoadingSpinner } from 'd-system'
import type { NextPage } from 'next'
import React from 'react'
import Title from 'components/common/Title'
import useGetRequest from 'hooks/useGetRequest'

const IngredientsStock: NextPage = () => {
  const { data, error, isLoading } = useGetRequest<GetIngredientStock>('/api/ingredientstock')

  if (isLoading) {
    return <LoadingSpinner size="large"/>
  }
  if (error) {
    return <ErrorMessage message={data as string} action="intenta de nuevo mas tarde" />
  }
  return <>
  <Head>
    <title>Ingredientes disponibles</title>
  </Head>
  <Title>Administrar ingredientes disponibles</Title>
  <CreateIngredientStock />
  <p>Para eliminar un ingrediente disponible pon la cantidad en 0</p>
  <DisplayIngredientsStock ingredients={data as GetIngredientStock} />
</>
}

export default IngredientsStock
