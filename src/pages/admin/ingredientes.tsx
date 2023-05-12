import React, { type FC } from 'react'
import CreateIngredient from 'components/web/CreateIngredient'
import CreatePurchasePlace from 'components/web/CreatePurchasePlace'
import DisplayIngredients from 'components/web/DisplayIngredients'
import ErrorMessage from 'components/web/common/ErrorMessage'
import Head from 'next/head'
import { LoadingSpinner } from 'd-system'
import type { NextPage } from 'next'
import { type RootState } from 'redux/store'
import Title from 'components/web/common/Title'
import { useSelector } from 'react-redux'

const Ingredientes: NextPage = () => <>
  <Head>
    <title>Administrar ingredientes</title>
  </Head>
  <Title>Administrar ingredientes</Title>
  <Content />
</>

const Content: FC = () => {
  const ingredientsData = useSelector((state: RootState) => state.ingredients)
  return <>
    <CreateIngredient />
    <CreatePurchasePlace />
    {ingredientsData.getIsLoading && <LoadingSpinner size="large" />}
    {(!ingredientsData.getIsLoading && ingredientsData.getIngredientsError) &&
      <ErrorMessage
        message="Error obteniendo los ingredientes"
        action="intenta de nuevo más tarde"
    />}
    {(!ingredientsData.getIsLoading && !ingredientsData.getIngredientsError) &&
      <DisplayIngredients />
    }
  </>
}

export default Ingredientes
