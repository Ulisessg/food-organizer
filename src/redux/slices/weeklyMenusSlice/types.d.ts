import { type GetDays } from 'controllers/food_organizer_crud/sql/days/types'

export type TGetDaysCallack = () => Promise<GetDays>
