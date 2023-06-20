import { type GetFoodTypes } from 'controllers/food_organizer_crud/sql/foodTypes/types'
import { type GetFoods } from 'controllers/food_organizer_crud/sql/foods/types'

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
