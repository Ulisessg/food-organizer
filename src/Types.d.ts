
/** Array must be referenced as const or readonly */
export type TGetKeysFromArrayOfStrings<T extends readonly string[]> =
T extends readonly string[] ? T[number] : never

/** All update thunks must have this params */
export interface TUpdateThunkArgs<T> {
  data: T
  groupingElementIndex: number | null
  elementIndex: number | null
}
