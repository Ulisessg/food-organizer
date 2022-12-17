import {
  IngredientsContext,
  IngredientsContextProvider
} from 'context/ingredientsContext'
import React, { FC, useContext } from 'react'
import CreateIngredient from 'components/CreateIngredient'
import CreatePurchasePlace from 'components/CreatePurchasePlace'
import DisplayIngredients from 'components/DisplayIngredients'
import ErrorMessage from 'components/common/ErrorMessage'
import Head from 'next/head'
import { LoadingSpinner } from 'd-system'
import type { NextPage } from 'next'
import Title from 'components/common/Title'

const Ingredientes: NextPage = () => <IngredientsContextProvider>
  <Head>
    <title>Administrar ingredientes</title>
  </Head>
  <Title>Administrar ingredientes</Title>
  <Content />
</IngredientsContextProvider>

const Content: FC = () => {
  const ingredientsContext = useContext(IngredientsContext)
  return <>
    <CreateIngredient />
    <CreatePurchasePlace />
    {ingredientsContext.ingredientsIsLoading && <LoadingSpinner size="large" />}
    {(!ingredientsContext.ingredientsIsLoading && ingredientsContext.errorGettingIngredients) &&
      <ErrorMessage
        message="Error obteniendo los ingredientes"
        action="intenta de nuevo más tarde"
    />}
    {(!ingredientsContext.ingredientsIsLoading && !ingredientsContext.errorGettingIngredients) &&
      <DisplayIngredients ingredients={ingredientsContext.ingredients} />
    }
  </>
}

export default Ingredientes
