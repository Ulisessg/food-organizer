import CreateFood from 'components/CreateFood'
import CreateFoodType from 'components/CreateFoodType'
import DisplayFoods from 'components/DisplayFoods'
import ErrorMessage from 'components/common/ErrorMessage'
import Head from 'next/head'
import { LoadingSpinner } from 'd-system'
import type { NextPage } from 'next'
import React from 'react'
import { type RootState } from 'redux/store'
import Title from 'components/common/Title'
import { useSelector } from 'react-redux'

const Foods: NextPage = () => {
  const foodsData = useSelector((state: RootState) => state.foods)

  if (foodsData.getFoodsIsLoading) {
    return <LoadingSpinner size="large"/>
  }
  if (foodsData.getFoodsError) {
    return <ErrorMessage
      message="Ocurrio un error obteniendo las comidas" action="intenta de nuevo mas tarde" />
  }
  return <>
  <Head>
    <title>Administrar comidas</title>
  </Head>
  <Title>Administrar comidas</Title>
  <CreateFood />
  <CreateFoodType />
  <DisplayFoods />
</>
}

export default Foods
