import CreateMenu from 'components/web/menus/CreateMenu'
import DisplayDailyMenus from 'components/web/menus/DisplayMenus'
import ErrorMessage from 'components/web/common/ErrorMessage'
import Head from 'next/head'
import { LoadingSpinner } from 'd-system'
import type { NextPage } from 'next'
import React from 'react'
import { type RootState } from 'redux/store'
import Title from 'components/web/common/Title'
import { useSelector } from 'react-redux'

const Menu: NextPage = () => {
  const menusData = useSelector((state: RootState) => state.menus)

  if (menusData.getMenusDataIsLoading) {
    return <LoadingSpinner size="large"/>
  }
  if (menusData.getMenusDataError) {
    return <ErrorMessage
    message="Ocurrió un error obteniendo los menús" action="intenta de nuevo mas tarde" />
  }
  return <>
  <Head>
    <title>Administrar menús</title>
  </Head>
  <Title>Administrar menús</Title>
  <CreateMenu />
  <DisplayDailyMenus menus={menusData.menus} />
</>
}

export default Menu
