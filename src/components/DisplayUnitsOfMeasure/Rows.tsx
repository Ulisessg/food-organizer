/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
import React, { type FC, Fragment, type MouseEvent, useContext, useEffect, useState } from 'react'
import { RowNoSpan, RowWithSpan, type TDataFields } from './Row'
import { Button } from 'd-system'
import { EditTableRowContextProvider } from 'context/EditTableRowContext'
import Modal from 'components/common/Modal'
import { ModalContext } from 'context/ModalContext'
import RequestResultStyles from 'components/common/RequestResultStyles'
import { type RootState } from 'redux/store'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

/** Get inputs modificated with DOM apis */
const getModifications = (): ModalInfoState => {
  const unitsOfMeasure: ModalInfoState['unitsOfMeasure'] = []
  const unitsOfMeasureTypes: ModalInfoState['unitsOfMeasureTypes'] = []
  const tableRowsEditionEnabled:
  NodeListOf<HTMLTableRowElement> = document.querySelectorAll('tr[data-edit-row=true]')
  tableRowsEditionEnabled.forEach((tr) => {
    const unitOfMeasureId: number = parseInt(
      tr.getAttribute('data-uom-id') as string,
      10
    )
    const unitOfmeasureTypeId: number = parseInt(
      tr.getAttribute('data-uomt-id') as string,
      10
    )

    let unitOfMeasureDataModified: ModalInfoState['unitsOfMeasure'][0] = {
      abbreviation: {
        newValue: '',
        prevValue: ''
      },
      id: unitOfMeasureId,
      name: {
        newValue: '',
        prevValue: ''
      }
    }

    let unitOfMeasureTypeDataModified: ModalInfoState['unitsOfMeasureTypes'][0] = {
      id: unitOfmeasureTypeId,
      name: {
        newValue: '',
        prevValue: ''
      }
    }

    let unitOfMeasureIsModified: boolean = false
    let unitOfMeasureTypeIsModified: boolean = false

    /**
     *  Each TR element only have 3 input and 2 references units_of_measure (name and abbreviation)
     */
    const inputsWithDataChanged: NodeListOf<HTMLInputElement> = tr
      .querySelectorAll('input[data-value-changed=true]')

    inputsWithDataChanged.forEach((input) => {
      const tableReferenced: TTablesAllowed = input.getAttribute('data-table') as TTablesAllowed
      const initialValue: string = input.getAttribute('data-initial-value') as string
      const newValue: string = input.value
      if (tableReferenced === 'units_of_measure') {
        unitOfMeasureIsModified = true
        const field: TDataFields = input.getAttribute('data-field') as TDataFields
        if (field === 'abbreviation') {
          unitOfMeasureDataModified = {
            ...unitOfMeasureDataModified,
            abbreviation: {
              newValue,
              prevValue: initialValue
            }
          }
        }
        if (field === 'name') {
          unitOfMeasureDataModified = {
            ...unitOfMeasureDataModified,
            name: {
              newValue,
              prevValue: initialValue
            }
          }
        }
      } else if (tableReferenced === 'units_of_measure_types') {
        unitOfMeasureTypeIsModified = true
        // This table only has one field, so it's not necessary reference it
        unitOfMeasureTypeDataModified = {
          ...unitOfMeasureTypeDataModified,
          name: {
            newValue,
            prevValue: initialValue
          }
        }
      }
    })

    /** Ensure no add empty data */
    if (unitOfMeasureIsModified) {
      unitsOfMeasure.push(unitOfMeasureDataModified)
    }
    if (unitOfMeasureTypeIsModified) {
      unitsOfMeasureTypes.push(unitOfMeasureTypeDataModified)
    }
  })
  return {
    unitsOfMeasure,
    unitsOfMeasureTypes
  }
}

const Rows: FC = () => {
  const modalContext = useContext(ModalContext)
  const unitsOfMeasureData = useSelector((state: RootState) => state.unitsOfMeasure)

  const [
    modalInfo,
    setModalInfo
  ] = useState<ModalInfoState>({
    unitsOfMeasure: [],
    unitsOfMeasureTypes: []
  })
  const updateData = (_ev: MouseEvent<HTMLButtonElement>): void => {
    // Show loading spinner
    modalContext.closeModal()
  }
  useEffect(
    () => {
      if (modalContext.modalIsOpen) {
        setModalInfo(getModifications())
      }
    },
    [modalContext.modalIsOpen]
  )
  return <>
  <Modal
    isOpen={modalContext.modalIsOpen}
    onRequestClose={modalContext.closeModal}
    shouldReturnFocusAfterClose={true}
  >
    <DataModifiedContainer>
      <DataModifiedTitle>Unidades de medida modificadas</DataModifiedTitle>
        <RequestResultStyles
          hidden={modalInfo.unitsOfMeasure.length !== 0}
          isError={false}
        >
          No hay unidades de medida modificadas
        </RequestResultStyles>
       {modalInfo.unitsOfMeasure.length >= 1 && <>
        {modalInfo.unitsOfMeasure.map(({
          abbreviation,
          id,
          name
        }) => <DataModifiedSectionContainer key={id}>
        <DataModifiedSection>
          <FieldTitle>Nombre</FieldTitle>
          <p>Valor anterior: <strong>{name.prevValue}</strong></p>
          <p>Valor actualizado: <strong>{name.newValue}</strong></p>
        </DataModifiedSection>
        <DataModifiedSection>
          <FieldTitle>Abreviacion</FieldTitle>
          <p>Valor anterior: <strong>{abbreviation.prevValue}</strong></p>
          <p>
            Valor actualizado: <strong>{abbreviation.newValue}</strong>
          </p>
        </DataModifiedSection>
        </DataModifiedSectionContainer>)}
       </>}
    </DataModifiedContainer>

    <DataModifiedContainer>
        <DataModifiedTitle>Tipos de unidad de medida modificadas</DataModifiedTitle>
        <RequestResultStyles
          hidden={modalInfo.unitsOfMeasureTypes.length !== 0}
          isError={false}
        >
          No hay tipos de unidad de medida modificadas
        </RequestResultStyles>
        {modalInfo.unitsOfMeasureTypes.length >= 1 && <>
          {modalInfo.unitsOfMeasureTypes.map(({
            id,
            name
          }) => <DataModifiedSectionContainer key={id}>
          <DataModifiedSection>
              <FieldTitle>Nombre</FieldTitle>
              <p>Valor anterior: <strong>{name.prevValue}</strong></p>
              <p>Valor actualizado: <strong>{name.newValue}</strong></p>
            </DataModifiedSection>
        </DataModifiedSectionContainer>)}
        </>}
    </DataModifiedContainer>
    <ModalButtonsContainer>
      <Button
        colorMessage="continue"
        size="small"
        text="Confirmar"
        onClick={updateData}
        disabled={(
          modalInfo.unitsOfMeasure.length === 0 &&
          modalInfo.unitsOfMeasureTypes.length === 0)}
      />
      <Button
        colorMessage="cancel"
        size="small"
        text="Cancelar"
        onClick={modalContext.closeModal}
      />
    </ModalButtonsContainer>
  </Modal>
  {unitsOfMeasureData.uomGroupedByType.map((uomt) => <Fragment key={uomt.uomt_id}>
      <EditTableRowContextProvider>
        {uomt.uom.map(({ abbreviation, id, name }, index) => <Fragment key={id}>
          {index === 0 && <RowWithSpan
            rowSpan={uomt.uom.length}
            uomAbbreviation={abbreviation}
             uomId={id}
             uomName={name}
             uomtId={uomt.uomt_id}
             uomtName={uomt.uomt_name}
          />}
          {index !== 0 && <RowNoSpan
            uomAbbreviation={abbreviation}
            uomName={name}
            uomId={id}
            uomtName={uomt.uomt_name}
           />}
        </Fragment>)}
      </EditTableRowContextProvider>

    </Fragment>)}

  </>
}

const DataModifiedContainer = styled.section`
  width: 90%;
  text-transform: capitalize;
  margin: 10px 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
`

const DataModifiedTitle = styled.p`
  font-weight: bold;
  font-size: 25px;
  padding-bottom: 10px;
  text-align: center;
`

const DataModifiedSectionContainer = styled.div`
  width: 350px;
  border: 2px solid ${({ theme }) => theme.colors.dark2};
  border-radius: 25px;
  padding: 20px;
  margin-top: 15px;
`

const DataModifiedSection = styled.div`
  display: grid;
  grid-row-gap: 20px;
`

const FieldTitle = styled.p`
  text-align: center;
  font-size: 20px;
  font-weight: bold;

`

const ModalButtonsContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 10px;
  & button {
    width: 100px;
  }
`

interface ModalInfoState {
  unitsOfMeasureTypes: Array<{
    id: number
    name: TModifications
  }>
  unitsOfMeasure: Array<{
    id: number
    name: TModifications
    abbreviation: TModifications
  }>
}

interface TModifications {
  prevValue: string
  newValue: string
}

type TTablesAllowed = 'units_of_measure' | 'units_of_measure_types'

export default Rows
