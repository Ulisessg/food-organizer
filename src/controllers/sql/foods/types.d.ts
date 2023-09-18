export type GetFoods = Array<{
  food_type_id: number
  food_type_name: string
  total_foods: number
  foods: Array<{
    image: string | null
    food_id: number
    food_name: string
    preparation_time: number
  }>
}>

type GetFoodsSingle = GetFoods[0]

export interface UpdateFoods extends GetFoodsSingle {}
