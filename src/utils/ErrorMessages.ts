/* eslint-disable func-style */
/* eslint-disable max-len */

export function invalidPropertyErrorMessage (propertyName: string, property: any, propertyRules: string): string {
  return `Invalid "${propertyName}" property, ${propertyRules}. value: ${property as string}`
}

export function invalidPropertyTypeErrorMessage (propertyName: string, property: any, propertyRules: string): string {
  return `Invalid "${propertyName}" property, ${propertyRules}. type: ${typeof property}. value: ${property as string}`
}
