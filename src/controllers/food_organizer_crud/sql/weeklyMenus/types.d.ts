export type GetWeeklyMenu = Array<{
  creation_date: string
  id: number
  monday: TDay
  tuesday: TDay
  wednesday: TDay
  thursday: TDay
  friday: TDay
  saturday: TDay
  sunday: TDay
}>

export type TDay = Array<{
  menu_id: number
  foods: Food[]
}> | null

interface Food {
  food_id: number
  food_name: string
}
