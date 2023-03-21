/** Array must be referenced as const or readonly */
export type TGetKeysFromArrayOfStrings<T extends readonly string[]> =
T extends readonly string[] ? T[number] : never
