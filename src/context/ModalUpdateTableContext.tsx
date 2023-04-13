/* eslint-disable max-lines-per-function */
import React, {
  type FC,
  Fragment,
  type ReactNode, createContext
} from 'react'
import useModalUpdateTableContext,
{ type ModalUpdateTableContextState } from 'hooks/components/useModalUpdateTableContext'
import { Button } from 'd-system'
import { type ButtonProps } from 'd-system/dist/types/components/atoms/Button'

import RequestResultStyles from 'components/common/RequestResultStyles'
import { type TUpdateThunkArgs } from 'Types'
import { type createAsyncThunk } from '@reduxjs/toolkit'
import randomId from 'utils/randomId'
import styled from 'styled-components'

const initialState: ModalUpdateTableContextState = {
  addInputsRepeated: () => {
    //
  },
  anyInputChange: false,
  anyInputIsEmpty: false,
  inputsRepeated: [] as unknown as any,
  removeInputsRepeated: () => {
    //
  },
  updateAnyInputChange: () => {
    //
  },
  updateAnyInputIsEmpty: () => {
    //
  }
}

export const ModalUpdateTableContext = createContext(initialState)

/** Checks if all inputs have required formats, if not disable 'continue' button */
export const ModalUpdateTableContextProvider: FC<ModalUpdateTableContextProviderProps> = ({
  children,
  buttonCancellProps,
  buttonConfirmProps,
  thunks
}) => {
  const {
    addInputsRepeated,
    anyInputChange,
    anyInputIsEmpty,
    inputsRepeated,
    removeInputsRepeated,
    updateAnyInputChange,
    updateAnyInputIsEmpty,
    updateData
  } = useModalUpdateTableContext(
    thunks,
    buttonConfirmProps
  )

  return <ModalUpdateTableContext.Provider value={{
    addInputsRepeated,
    anyInputChange,
    anyInputIsEmpty,
    inputsRepeated,
    removeInputsRepeated,
    updateAnyInputChange,
    updateAnyInputIsEmpty
  }}>
    {children}
    <RequestResultStyles
      hidden={inputsRepeated.size === 0}
      isError={false}
    >
      <InputsRepeatedContainer>
          <InputsRepeatedLabel>
            Valores repetidos:
          </InputsRepeatedLabel>
          {Array.from(inputsRepeated).map((data) => < Fragment key={randomId(data[0])}>
              {data[1].map((inputRepeated) => <Fragment key={randomId(inputRepeated.name)}>
                <InputRepeated>
                  {inputRepeated.parentElement?.textContent}: <strong>{inputRepeated.value}</strong>
                </InputRepeated>
              </Fragment>)}
            </Fragment>)}
        </InputsRepeatedContainer>

    </RequestResultStyles>

    <ButtonsContainer>
    <Button
        {...buttonConfirmProps}
        colorMessage="continue"
        size="small"
        text="Confirmar cambios"
        disabled={
          !anyInputChange || anyInputIsEmpty || inputsRepeated.size >= 1
        }
        onClick={updateData}
      />
      <Button
        {...buttonCancellProps}
        colorMessage="cancel"
        size="small"
        text="Cancelar"
      />
    </ButtonsContainer>
  </ModalUpdateTableContext.Provider>
}

const ButtonsContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 10%;
  width: 100%;
  justify-content: center;
  margin: 20px  0px;
`

const InputsRepeatedContainer = styled.div`
  display: grid;
  justify-content: center;
  grid-row-gap: 20px;
  width: 100%;
  height: auto;
  margin-bottom: 35px;
  color: black;
`

const InputsRepeatedLabel = styled.p`
  font-size: 20px;
  text-align: center;
  font-weight: bold;
  margin-bottom: 20px;
`

const InputRepeated = styled.p`
  text-transform: capitalize;
  font-size: 18px;
`

interface ModalUpdateTableContextProviderProps {
  children: ReactNode
  buttonConfirmProps?: ButtonProps
  buttonCancellProps?: ButtonProps
  thunks: TModalUpdateTableThunks
}

export type TModalUpdateTableThunks = Record<

/** DB table */
string,
ReturnType<typeof createAsyncThunk<any, TUpdateThunkArgs>>>
