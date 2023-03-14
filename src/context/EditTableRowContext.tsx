import { type FC, type ReactNode, createContext, useState } from 'react'

const initalState: EditTableRowContextState = {
  allowEdit: false,
  toggleAllowEdit: () => {
    //
  }
}

export const EditTableRowContext = createContext(initalState)

export const EditTableRowContextProvider: FC<EditTableRowContextProviderProps> = ({ children }) => {
  const { Provider } = EditTableRowContext
  const [
    allowEdit,
    setAllowEdit
  ] = useState<boolean>(false)

  const toggleAllowEdit: EditTableRowContextState['toggleAllowEdit'] = () => {
    setAllowEdit((prev) => !prev)
  }
  return <Provider value={{
    allowEdit,
    toggleAllowEdit
  }}>
    {children}
  </Provider>
}

interface EditTableRowContextProviderProps {
  children: ReactNode
}

interface EditTableRowContextState {
  allowEdit: boolean
  toggleAllowEdit: () => void
}
