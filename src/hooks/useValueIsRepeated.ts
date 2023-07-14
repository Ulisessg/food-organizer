import { useCallback, useState } from 'react'
import safeObjectGet from 'utils/safeObjectGet'

const useValueIsRepeated = <T extends Record<string, any>>(
  valueToOmit?: string
): UseValueIsRepeatedReturn<T> => {
  const [
    isRepeated,
    setIsRepeated
  ] = useState<boolean>(false)

  const searchIsRepeated: UseValueIsRepeatedReturn<T>['searchIsRepeated'] =
  useCallback(
    (list, key, valueToSearch) => {
      let existValueRepeated: boolean = false
      list.some((element) => {
        const elementValue = safeObjectGet(
          element,
          key
        )
        if (elementValue === valueToOmit) {
          return false
        }
        if (elementValue.toLowerCase() === valueToSearch.toLowerCase()) {
          existValueRepeated = true
          return true
        }
        return false
      })
      setIsRepeated(existValueRepeated)
    },
    [valueToOmit]
  )

  const resetIsRepeated = useCallback(
    () => {
      setIsRepeated(false)
    },
    []
  )
  return {
    isRepeated,
    resetIsRepeated,
    searchIsRepeated
  }
}

interface UseValueIsRepeatedReturn <ObjType extends Record<string, any>> {
  searchIsRepeated: (list: ObjType[], key: keyof ObjType, valueToSearch: string) => void
  // Set is repeated as false
  resetIsRepeated: () => void
  isRepeated: boolean
}

export default useValueIsRepeated
