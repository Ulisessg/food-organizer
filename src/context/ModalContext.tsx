import React, { type FC, type ReactNode, createContext, useState } from 'react'

const initialState: ModalContextState = {
  closeModal: () => {
    //
  },
  modalIsOpen: false,
  openModal: () => {
    //
  }
}

export const ModalContext = createContext(initialState)

export const ModalContextProvider: FC<ModalContextProviderProps> = ({ children }) => {
  const [
    modalIsOpen,
    setModalIsOpen
  ] = useState<boolean>(false)
  const openModal: ModalContextState['openModal'] = () => {
    setModalIsOpen(true)
  }
  const closeModal: ModalContextState['closeModal'] = () => {
    setModalIsOpen(false)
  }
  return <ModalContext.Provider value={{
    closeModal,
    modalIsOpen,
    openModal
  }}>
    {children}
  </ModalContext.Provider>
}

interface ModalContextProviderProps {
  children: ReactNode
}

export interface ModalContextState {
  openModal: () => void
  closeModal: () => void
  modalIsOpen: boolean
}
