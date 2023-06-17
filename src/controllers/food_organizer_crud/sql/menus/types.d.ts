export type GetMenus = Array<{
  id: number
  comment: string | null
  menu_foods: Array<{
    menu_food_id: number
    image: null | string
    food_id: number
    food_name: string
    preparation_time: number
  }>
}>
