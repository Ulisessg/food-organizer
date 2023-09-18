import {
  type CreateFoodType,
  type GetFoodTypes
  , type UpdateFoodType
} from 'controllers/sql/foodTypes/types'
import {
  type GetFoods,
  type UpdateFoods
} from 'controllers/sql/foods/types'
import {
  type CreateFoodIngredients
} from 'controllers/sql/foodIngredients/types'
import { type foods } from 'controllers/dbTablesTypes'

export type SingleFoodType = GetFoodTypes[0]
export type SingleFoodGroupedByType = GetFoods[0]
export type SingleFood = SingleFoodGroupedByType['foods'][0]

export interface TFoodState {
  foods: SingleFoodGroupedByType['foods']
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

  // Update food types
  updateFoodTypesIsLoading: boolean
  updateFoodTypesSuccess: boolean
  updateFoodTypesError: boolean
  updateFoodTypesEnd: boolean

  // Update foods
  updateFoodsIsLoading: boolean
  updateFoodsSuccess: boolean
  updateFoodsError: boolean
  updateFoodsEnd: boolean
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

interface UpdateFoodTypeCallbackReturn extends SingleFoodType {
  elementIndex: number
}

interface UpdateFoodCallbackReturn extends UpdateFoods {
  elementIndex: number
  groupingElementIndex: number
}

export type CreateFoodCallback = (food: CreateFood) => () => Promise<SingleFoodGroupedByType>
export type CreateFoodtypeCallback = (foodType: CreateFoodType) => () => Promise<SingleFoodType>

export type UpdateFoodTypeCallback = (
  foodType: UpdateFoodType,
  elementIndex: number
) => () => Promise<UpdateFoodTypeCallbackReturn>

export type UpdateFoodCallback = (
  food: foods,
  groupingElementIndex: number,
  elementIndex: number
) => () => Promise<UpdateFoodCallbackReturn>
