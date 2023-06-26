import { type TDaysOfTheWeek, type TDaysOfTheWeekInSpanish } from './constants'

/**
 * Get day name from spanish to english
 * @param {TDaysOfTheWeekInSpanish} day
 * @returns {string}
 */
const getDayNameFromSpanish = (day: TDaysOfTheWeekInSpanish): TDaysOfTheWeek => {
  switch (day.toLowerCase()) {
    case 'lunes':
      return 'monday'
    case 'martes':
      return 'tuesday'
    case 'miercoles':
      return 'wednesday'
    case 'jueves':
      return 'thursday'
    case 'viernes':
      return 'friday'
    case 'sábado':
      return 'saturday'
    case 'domingo':
      return 'sunday'
    default:
      throw new Error('Ese dia no existe')
  }
}

export default getDayNameFromSpanish
