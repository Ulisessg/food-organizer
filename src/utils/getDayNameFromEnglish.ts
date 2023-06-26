import { type TDaysOfTheWeek, type TDaysOfTheWeekInSpanish } from './constants'

/**
 * Get day name from english to spanish
 * @param {DaysOfTheWeek} day
 * @returns {string}
 */
const getDayNameFromEnglish = (day: TDaysOfTheWeek): TDaysOfTheWeekInSpanish => {
  switch (day.toLowerCase()) {
    case 'monday':
      return 'lunes'
    case 'tuesday':
      return 'martes'
    case 'wednesday':
      return 'miercoles'
    case 'thursday':
      return 'jueves'
    case 'friday':
      return 'viernes'
    case 'saturday':
      return 'sábado'
    case 'sunday':
      return 'domingo'
    default:
      throw new Error('Ese dia no existe')
  }
}

export default getDayNameFromEnglish
