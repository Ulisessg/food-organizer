import CreateIngredient from 'components/CreateIngredient'
import CreatePurchasePlace from 'components/CreatePurchasePlace'
import DisplayIngredients from 'components/DisplayIngredients'
import ErrorMessage from 'components/common/ErrorMessage'
import type { GetIngredients } from 'controllers/food_organizer_crud/ingredientCRUD'
import Head from 'next/head'
import { LoadingSpinner } from 'd-system'
import type { NextPage } from 'next'
import React from 'react'
import Title from 'components/common/Title'
import useGetRequest from 'hooks/useGetRequest'

const Ingredientes: NextPage = () => {
  const { data, error, isLoading } = useGetRequest<GetIngredients>('/api/ingredient')

  if (isLoading) {
    return <LoadingSpinner size="large"/>
  }
  if (error) {
    return <ErrorMessage message={data as string} action="intenta de nuevo mas tarde" />
  }
  return <>
  <Head>
    <title>Administrar ingredientes</title>
  </Head>
  <Title>Administrar ingredientes</Title>
  <CreateIngredient />
  <CreatePurchasePlace />
  <DisplayIngredients ingredients={data as GetIngredients} />
</>
}

export default Ingredientes
