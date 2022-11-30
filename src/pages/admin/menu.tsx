import CreateMenu from 'components/CreateMenu'
import DisplayDailyMenus from 'components/DisplayMenus'
import ErrorMessage from 'components/common/ErrorMessage'
import type { GetMenus } from 'controllers/food_organizer_crud/MenuCRUD'
import Head from 'next/head'
import { LoadingSpinner } from 'd-system'
import type { NextPage } from 'next'
import React from 'react'
import Title from 'components/common/Title'
import useGetRequest from 'hooks/useGetRequest'

const Menu: NextPage = () => {
  const { data, error, isLoading } = useGetRequest<GetMenus>('/api/menu')

  if (isLoading) {
    return <LoadingSpinner size="large"/>
  }
  if (error) {
    return <ErrorMessage message={data as string} action="intenta de nuevo mas tarde" />
  }
  return <>
  <Head>
    <title>Administrar menús</title>
  </Head>
  <Title>Administrar menús</Title>
  <CreateMenu />
  <DisplayDailyMenus menus={data as GetMenus} />
</>
}

export default Menu
