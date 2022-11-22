import CreateFood from 'components/CreateFood'
import DisplayFoods from 'components/DisplayFoods'
import ErrorMessage from 'components/common/ErrorMessage'
import { GetFoods } from 'controllers/food_organizer_crud/foodsCRUD'
import Head from 'next/head'
import { LoadingSpinner } from 'd-system'
import type { NextPage } from 'next'
import React from 'react'
import Title from 'components/common/Title'
import useGetRequest from 'hooks/useGetRequest'

const Foods: NextPage = () => {
  const { data, error, isLoading } = useGetRequest<GetFoods>('/api/foods')

  if (isLoading) {
    return <LoadingSpinner size="large"/>
  }
  if (error) {
    return <ErrorMessage message={data as string} action="intenta de nuevo mas tarde" />
  }
  return <>
  <Head>
    <title>Administrar comidas</title>
  </Head>
  <Title>Administrar comidas</Title>
  <CreateFood />
  <DisplayFoods foodsOrderByType={data as GetFoods} />
</>
}

export default Foods
