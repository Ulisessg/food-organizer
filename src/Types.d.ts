
/** Array must be referenced as const or readonly */
export type TGetKeysFromArrayOfStrings<T extends readonly string[]> =
T extends readonly string[] ? T[number] : never

/** All update thunks must have this params */
export interface TUpdateThunkArgs {
  elementId: string
  data: HTMLInputElement[]
  groupingElementIndex: string | null
  elementIndex: string
}
