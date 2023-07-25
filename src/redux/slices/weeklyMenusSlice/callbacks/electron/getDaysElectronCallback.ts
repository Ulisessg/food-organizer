import { type GetDays } from 'controllers/sql/days/types'
import { type TGetDaysCallack } from '../../types'

const getDaysElectronCallback: TGetDaysCallack = async () => {
  const daysData = await new Promise<GetDays>((resolve, reject) => {
    try {
      const data = window.getDaysData()
      resolve(data)
    } catch (error) {
      reject(error)
    }
  })
  return daysData
}

export default getDaysElectronCallback
