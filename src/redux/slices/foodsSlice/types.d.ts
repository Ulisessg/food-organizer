import {
  type CreateFoodIngredients
} from 'controllers/sql/foodIngredients/types'
import {
  type CreateFoodType
} from 'controllers/sql/foodTypes/createFoodTypesSql'
import { type GetFoodTypes } from 'controllers/sql/foodTypes/types'
import { type GetFoods } from 'controllers/sql/foods/types'

export interface TFoodState {
  foods: GetFoods[0]['foods']
  foodsGroupedByType: GetFoods
  foodTypes: GetFoodTypes
  // Foods

  // Get
  getFoodsIsLoading: boolean
  getFoodsSuccess: boolean
  getFoodsError: boolean
  getFoodsEnd: boolean
  // Post
  postFoodsIsLoading: boolean
  postFoodsSuccess: boolean
  postFoodsError: boolean
  postFoodsEnd: boolean

  // Food types

  // Get
  getFoodTypesIsLoading: boolean
  getFoodTypesSuccess: boolean
  getFoodTypesError: boolean
  getFoodTypesEnd: boolean
  // Post
  postFoodTypesIsLoading: boolean
  postFoodTypesSuccess: boolean
  postFoodTypesError: boolean
  postFoodTypesEnd: boolean
}

interface GetFoodsDataThunkReturn {
  foodsGroupedByType: TFoodState['foodsGroupedByType']
  foodTypes: TFoodState['foodTypes']
}

export type TGetFoodsDataCallback = () => Promise<GetFoods>
export type TGetFoodsTypesDataCallback = () => Promise<GetFoodTypes>

export interface CreateFood {
  name: string
  used_counter: number | null
  preparation_time: number
  food_type_id: number
  image: string | null
  ingredients: CreateFoodIngredients
}

export type CreateFoodCallback = (food: CreateFood) => () => Promise<GetFoods[0]>
export type CreateFoodtypeCallback = (foodType: CreateFoodType) => () => Promise<GetFoodTypes[0]>
