import { type MouseEvent, useState } from 'react'

const useEditTableButtons = (): UseEditTableButtonsReturn => {
  const [
    edit,
    setEdit
  ] = useState<boolean>(false)
  const onChangeEdit: UseEditTableButtonsReturn['onChangeEdit'] = (ev) => {
    setEdit((prev) => !prev)
  }
  return {
    edit,
    onChangeEdit
  }
}

interface UseEditTableButtonsReturn {
  edit: boolean
  onChangeEdit: (ev: MouseEvent<HTMLButtonElement>) => void
}

export default useEditTableButtons
