import { useState } from 'react'

const useValueIsRepeated = <T extends Object>(): UseValueIsRepeatedReturn<T> => {
  const [
    isRepeated,
    setIsRepeated
  ] = useState<boolean>(false)

  const searchIsRepeated: UseValueIsRepeatedReturn<T>['searchIsRepeated'] =
   (list, key, valueToSearch) => {
     let existValueRepeated: boolean = false
     list.forEach((element) => {
       console.log(
         'Element',
         element
       )
       console.log(
         'Key',
         key
       )
       console.log(valueToSearch)
       const elementValue = element[key] as string
       if (elementValue.toLowerCase() === valueToSearch.toLowerCase()) {
         existValueRepeated = true
       }
     })
     setIsRepeated(existValueRepeated)
   }

  return {
    isRepeated,
    searchIsRepeated
  }
}

interface UseValueIsRepeatedReturn <ObjType extends Object> {
  searchIsRepeated: (list: ObjType[], key: keyof ObjType, valueToSearch: string) => void
  isRepeated: boolean
}

export default useValueIsRepeated
