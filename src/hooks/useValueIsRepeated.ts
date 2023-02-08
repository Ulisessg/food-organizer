import { useState } from 'react'

const useValueIsRepeated = <T extends Record<string, any>>(): UseValueIsRepeatedReturn<T> => {
  const [
    isRepeated,
    setIsRepeated
  ] = useState<boolean>(false)

  const searchIsRepeated: UseValueIsRepeatedReturn<T>['searchIsRepeated'] =
   (list, key, valueToSearch) => {
     let existValueRepeated: boolean = false
     list.some((element) => {
       const elementValue = element[key] as string
       if (elementValue.toLowerCase() === valueToSearch.toLowerCase()) {
         existValueRepeated = true
         return true
       }
       return false
     })
     setIsRepeated(existValueRepeated)
   }

  return {
    isRepeated,
    searchIsRepeated
  }
}

interface UseValueIsRepeatedReturn <ObjType extends Record<string, any>> {
  searchIsRepeated: (list: ObjType[], key: keyof ObjType, valueToSearch: string) => void
  isRepeated: boolean
}

export default useValueIsRepeated
