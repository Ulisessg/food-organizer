import CreateWeeklyMenu from 'components/web/CreateWeeklyMenu'
import DisplayWeeklyMenus from 'components/web/DisplayWeeklyMenus'
import ErrorMessage from 'components/web/common/ErrorMessage'
import {
  type GetWeeklyMenu
} from 'controllers/food_organizer_crud/sql/weeklyMenus/getWeeklyMenusSql'
import Head from 'next/head'
import { LoadingSpinner } from 'd-system'
import type { NextPage } from 'next'
import React from 'react'
import Title from 'components/web/common/Title'
import useGetRequest from 'hooks/useGetRequest'

const WeeklyMenus: NextPage = () => {
  const { data, error, isLoading } = useGetRequest<GetWeeklyMenu>('/api/weeklymenu')

  if (isLoading) {
    return <LoadingSpinner size="large"/>
  }
  if (error) {
    return <ErrorMessage message={data as string} action="intenta de nuevo mas tarde" />
  }
  return <>
  <Head>
    <title>Administrar los menús de la semana</title>
  </Head>
  <Title>Administrar los menús de la semana</Title>
  <CreateWeeklyMenu />
  <DisplayWeeklyMenus />
</>
}

export default WeeklyMenus
