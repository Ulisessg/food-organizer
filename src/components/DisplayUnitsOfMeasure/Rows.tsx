/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
import React, { type FC, Fragment, type MouseEvent, useContext } from 'react'
import { RowNoSpan, RowWithSpan } from './Row'
import { EditTableRowContextProvider } from 'context/EditTableRowContext'
import { ModalContext } from 'context/ModalContext'
import ModalUpdateTable from 'components/common/ModalUpdateTable'
import { type RootState } from 'redux/store'
import { useSelector } from 'react-redux'

const Rows: FC = () => {
  const modalContext = useContext(ModalContext)
  const unitsOfMeasureData = useSelector((state: RootState) => state.unitsOfMeasure)

  const updateData = (_ev: MouseEvent<HTMLButtonElement>): void => {
    // Show loading spinner
    modalContext.closeModal()
  }

  return <>
  <ModalUpdateTable dataChanged={[
    {
      dbTable: 'units_of_measure',
      elementId: 1,
      fields: [
        {
          fieldName: 'name',
          inputProps: {
            id: 'name',
            label: 'Name',
            name: 'name'
          },
          prevValue: 'anasas'
        }
      ],
      tableNameToDisplay: 'Unit of measure'
    }
  ]} formTitle="Update unit of measure" modalProps={{
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
             openModal={modalContext.openModal}
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
