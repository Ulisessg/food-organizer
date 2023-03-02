import dayjs from 'dayjs'

const getDayOfTheWeekFromDate = (date: string | Date): GetDayOfTheWeekFromDateReturn => {
  const day = dayjs(date).get('day')
  switch (day) {
    case 0:
      return 'sunday'
    case 1:
      return 'monday'
    case 2:
      return 'tuesday'
    case 3:
      return 'wednesday'
    case 4:
      return 'thursday'
    case 5:
      return 'friday'
    case 6:
      return 'saturday'

    default:
      throw new Error('Invalid date')
  }
}

type GetDayOfTheWeekFromDateReturn =
 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday'

export default getDayOfTheWeekFromDate
