/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
import ModalUpdateTable,
{ type ModalUpdateTableDataChanged } from 'components/common/ModalUpdateTable'
import React, { type FC, Fragment, type MouseEvent, useContext, useState } from 'react'
import { RowNoSpan, RowWithSpan } from './Row'
import { EditTableRowContextProvider } from 'context/EditTableRowContext'
import { ModalContext } from 'context/ModalContext'
import { type RootState } from 'redux/store'
import { getDataFromTable } from 'utils/getDataFromTable'
import randomId from 'utils/randomId'
import { useSelector } from 'react-redux'

const Rows: FC = () => {
  const modalContext = useContext(ModalContext)
  const unitsOfMeasureData = useSelector((state: RootState) => state.unitsOfMeasure)
  const [
    modalData,
    setModalData
  ] = useState<ModalUpdateTableDataChanged>([])
  const getDataFromTableToModify = (ev: MouseEvent<HTMLButtonElement>): void => {
    const button = ev.currentTarget
    const table = ev.currentTarget.parentElement
      ?.parentElement?.parentElement?.parentElement as HTMLTableElement

    const unitsOfMeasureIds = button.parentElement?.getAttribute('data-uom-ids') as string
    const unitOfMeasureTypeId = button.parentElement?.getAttribute('data-uomt-id') as string

    const unitOfMeasureType = getDataFromTable(
      table,
      'units_of_measure_type',
      unitOfMeasureTypeId,
      ['name'] as const
    )

    const unitsOfMeasure = unitsOfMeasureIds.split(',').map((id) => ({
      id: parseInt(
        id,
        10
      ),
      ...getDataFromTable(
        table,
        'units_of_measure',
        id,
        [
          'name',
          'abbreviation'
        ] as const
      )
    }))
    console.log(unitsOfMeasure)

    setModalData([
      {
        dbTable: 'units_of_measure',
        elementId: parseInt(
          unitOfMeasureTypeId,
          10
        ),
        fields: [
          {
            fieldName: 'name',
            inputProps: {
              id: unitOfMeasureTypeId,
              label: 'Tipo de unidad de medida',
              name: unitOfMeasureTypeId
            },
            prevValue: unitOfMeasureType.name
          }
        ],
        formTitle: 'Actualizar el tipo de unidad de medida',
        tableNameToDisplay: 'Tipos de unidad de medida'
      },
      ...unitsOfMeasure.map<ModalUpdateTableDataChanged[0]>((uom) => ({
        dbTable: '',
        elementId: uom.id,

        fields: [
          {
            fieldName: 'name',
            inputProps: {
              id: randomId(`${uom.id}`),
              label: 'Nombre de la unidad de medida',
              name: randomId(`${uom.id}`)

            },

            prevValue: uom.name
          },
          {
            fieldName: 'abbreviation',
            inputProps: {
              id: randomId(`${uom.id}`),
              label: 'Abreviación de la unidad de medida',
              name: randomId(`${uom.id}`)

            },
            prevValue: uom.abbreviation
          }
        ],
        formTitle: 'Actualizar la unidad de medida',
        tableNameToDisplay: 'Unidades de medida'
      }))
    ])

    modalContext.openModal()
  }
  const updateData = (_ev: MouseEvent<HTMLButtonElement>): void => {
    // Show loading spinner
    modalContext.closeModal()
  }

  return <>
  <ModalUpdateTable
    dataChanged={modalData}
    modalProps={{
      isOpen: modalContext.modalIsOpen,
      onRequestClose: modalContext.closeModal,
      shouldReturnFocusAfterClose: true
    }}
  onClikConfirmUpdate={updateData}
  />
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
             openModal={getDataFromTableToModify}
             uomIds={uomt.uomIds}
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

export default Rows
