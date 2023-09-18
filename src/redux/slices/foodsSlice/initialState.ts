import { type TFoodState } from './types'

const initialState: TFoodState = {
  foodTypes: [],
  foods: [],
  foodsGroupedByType: [],
  getFoodTypesEnd: false,
  getFoodTypesError: false,
  getFoodTypesIsLoading: false,
  getFoodTypesSuccess: false,
  getFoodsEnd: false,
  getFoodsError: false,
  getFoodsIsLoading: false,
  getFoodsSuccess: false,
  postFoodTypesEnd: false,
  postFoodTypesError: false,
  postFoodTypesIsLoading: false,
  postFoodTypesSuccess: false,
  postFoodsEnd: false,
  postFoodsError: false,
  postFoodsIsLoading: false,
  postFoodsSuccess: false,
  updateFoodTypesEnd: false,
  updateFoodTypesError: false,
  updateFoodTypesIsLoading: false,
  updateFoodTypesSuccess: false,
  updateFoodsEnd: false,
  updateFoodsError: false,
  updateFoodsIsLoading: false,
  updateFoodsSuccess: false
}

export default initialState
