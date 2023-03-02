import React, { type FC, type ReactNode } from 'react'
import dayjs from 'dayjs'
import getWeekRangeOfDates from 'utils/getWeekRangeOfDates'
import styled from 'styled-components'

const DispkayWeeklyMenusContainer: FC<
{
  children: ReactNode
  sowDate: boolean
  date?: string
}> = ({ children, sowDate, date }) => {
  const rangeOfDates = getWeekRangeOfDates(dayjs(date).toDate() ?? '')

  return <>
     {sowDate && <p>{rangeOfDates.sundayDate} - {rangeOfDates.saturdayDate}</p>}
     <DispkayWeeklyMenusContainerStyles>
     {children}
     </DispkayWeeklyMenusContainerStyles>
   </>
}

const DispkayWeeklyMenusContainerStyles = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  width: 90vw;
  .day_no_data {
    padding: 5px;
    text-align: center;
    text-transform: initial;
    font-weight: 600;
  }
  .daily_menu{ 
    border: 1.5px solid black;
    height: 500px;
  } 
  @media screen and (min-width: 1020px) {
    grid-template-columns: 1fr 1fr;
    grid-gap: 15px;
  }

`

export default DispkayWeeklyMenusContainer
