import React, { type FC, type ReactNode, createContext, useState } from 'react'

const initialState: ModalContextState = {
  closeModal: () => {
    //
  },
  elementIndex: null as unknown as number,
  groupingElementIndex: null,
  modalIsOpen: false,
  openModal: () => {
    //
  }
}

export const ModalUpdateDataContext = createContext(initialState)

export const ModalUpdateDataContextProvider: FC<ModalContextProviderProps> = ({ children }) => {
  const [
    elementPositionInArray,
    setElementPositionInArray
  ] = useState<ElementPositionInArrayState>({
    elementIndex: null as unknown as number,
    groupingElementIndex: null
  })

  const [
    modalIsOpen,
    setModalIsOpen
  ] = useState<boolean>(false)

  const openModal: ModalContextState['openModal'] = (elementIndex, groupingElementIndex) => {
    setModalIsOpen(true)
    setElementPositionInArray({
      elementIndex,
      groupingElementIndex
    })
  }

  const closeModal: ModalContextState['closeModal'] = () => {
    setModalIsOpen(false)
  }
  return <ModalUpdateDataContext.Provider value={{
    closeModal,
    elementIndex: elementPositionInArray.elementIndex,
    groupingElementIndex: elementPositionInArray.groupingElementIndex,
    modalIsOpen,
    openModal
  }}>
    {children}
  </ModalUpdateDataContext.Provider>
}

interface ModalContextProviderProps {
  children: ReactNode
}

export interface ModalContextState {
  openModal:
  (
    elementIndex: ModalContextState['elementIndex'],
    groupingElementIndex: ModalContextState['groupingElementIndex']
  ) => void

  closeModal: () => void
  modalIsOpen: boolean
  elementIndex: number
  groupingElementIndex: number | null
}

interface ElementPositionInArrayState {
  elementIndex: ModalContextState['elementIndex']
  groupingElementIndex: ModalContextState['groupingElementIndex']
}
