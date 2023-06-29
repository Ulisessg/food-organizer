import CreateWeeklyMenu from 'components/web/CreateWeeklyMenu'
import DisplayWeeklyMenus from 'components/web/DisplayWeeklyMenus'
import Head from 'next/head'
import type { NextPage } from 'next'
import React from 'react'
import Title from 'components/web/common/Title'

const WeeklyMenus: NextPage = () => <>
  <Head>
    <title>Administrar los menús de la semana</title>
  </Head>
  <Title>Administrar los menús de la semana</Title>
  <CreateWeeklyMenu />
  <DisplayWeeklyMenus />
</>

export default WeeklyMenus
