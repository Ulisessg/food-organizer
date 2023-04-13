/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
import React, {
  type FC,
  Fragment,
  type MouseEvent,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'
import { RowNoSpan, RowWithSpan } from './Row'
import {
  updateUnitOfMeasureThunk,
  updateUomtThunk
} from 'redux/slices/unitsOfMeasureSlice/thunks'
import { EditTableRowContextProvider } from 'context/EditTableRowContext'
import InputComponent from 'components/common/ModalUpdateTable/UpdateTableInputComponent'
import { ModalContext } from 'context/ModalContext'
import ModalUpdateTable from '../common/ModalUpdateTable/ModalUpdateTable'
import { type RootState } from 'redux/store'
import { UpdateTableInputsContextProvider } from 'context/UpdateTableInputsContext'
import randomId from 'utils/randomId'
import { useSelector } from 'react-redux'

const Rows: FC = () => {
  const [
    uomtIndex,
    setUomtIndex
  ] = useState<number>(0)
  const modalRef = useRef<HTMLDivElement>()
  const modalContext = useContext(ModalContext)
  const unitsOfMeasureData = useSelector((state: RootState) => state.unitsOfMeasure)

  const getDataFromTableToModify = (ev: MouseEvent<HTMLButtonElement>): void => {
    const uomtIdx = ev.currentTarget.getAttribute('data-grouping-element-index')
    setUomtIndex(uomtIdx as any)
    modalContext.openModal()
  }

  // eslint-disable-next-line security/detect-object-injection
  const selectedUomt = unitsOfMeasureData?.uomGroupedByType[uomtIndex]

  useEffect(
    () => {
      modalRef.current = document.querySelector('.ReactModalPortal') as HTMLDivElement
    },
    [modalContext.modalIsOpen]
  )

  return <>
  <ModalUpdateTable
    buttonCancellProps={{
      onClick: modalContext.closeModal
    }}
    modalProps={{
      id: 'modal_update_table',
      isOpen: modalContext.modalIsOpen,
      onRequestClose: modalContext.closeModal,
      shouldReturnFocusAfterClose: true
    }}
    thunks={{
      units_of_measure: updateUnitOfMeasureThunk as any,
      units_of_measure_type: updateUomtThunk as any
    }}
  >
    <UpdateTableInputsContextProvider
       formTitle="Actualizar tipo de unidad de medida"
       dbTable="units_of_measure_type"
       elementId={selectedUomt?.uomt_id}
       elementIndex={uomtIndex}
       groupingElementIndex={null}
      >
      <InputComponent
        initialValue={selectedUomt?.uomt_name}
        inputProps={{
          allowRepeatedValue: false,
          id: selectedUomt?.uomt_name,
          label: 'Nombre del tipo de unidad de medida',
          name: selectedUomt?.uomt_name
        }}
        field="name"
        modal={modalRef.current as HTMLDivElement}
      />
    </UpdateTableInputsContextProvider>

    {selectedUomt?.uom.map((uom, uomIndex) => <Fragment
      key={randomId(uom.id as any)}>
      <UpdateTableInputsContextProvider
        formTitle="Actualizar unidad de medida"
        dbTable="units_of_measure"
        elementId={uom.id}
        elementIndex={uomIndex}
        groupingElementIndex={uomtIndex}
      >
        <InputComponent
          initialValue={uom.name}
          inputProps={{
            allowRepeatedValue: false,
            id: `${uom.id}${uom.name}`,
            label: 'Nombre de la medida de medida',
            name: `${uom.id}${uom.name}`
          }}
          field="name"
          modal={modalRef.current as HTMLDivElement}
        />
        <InputComponent
          initialValue={uom.abbreviation}
          inputProps={{
            allowRepeatedValue: false,
            id: `${uom.id}${uom.abbreviation}`,
            label: 'Areviación de la medida de medida',
            name: `${uom.id}${uom.abbreviation}`
          }}
          field="abbreviation"
          modal={modalRef.current as HTMLDivElement}
        />
      </UpdateTableInputsContextProvider>
    </Fragment>)}
  </ModalUpdateTable>

  {/* Display data */}

  {unitsOfMeasureData.uomGroupedByType.map((uomt, uomtIdx) => <Fragment key={uomt.uomt_id}>
      <EditTableRowContextProvider>
        {uomt.uom.map(({ abbreviation, id, name }, uomGroupedIndex) => <Fragment key={id}>
          {uomGroupedIndex === 0 && <RowWithSpan
            rowSpan={uomt.uom.length}
            uomAbbreviation={abbreviation}
             uomId={id}
             uomName={name}
             uomtId={uomt.uomt_id}
             uomtName={uomt.uomt_name}
             openModal={getDataFromTableToModify}
             uomIds={uomt.uomIds}
             groupingElementIndex={uomtIdx}
             elementIndex={uomGroupedIndex}
          />}
          {uomGroupedIndex !== 0 && <RowNoSpan
            groupingElementIndex={uomtIdx}
            uomAbbreviation={abbreviation}
            uomName={name}
            uomId={id}
            uomtName={uomt.uomt_name}
            elementIndex={uomGroupedIndex}
           />}
        </Fragment>)}
      </EditTableRowContextProvider>

    </Fragment>)}

  </>
}

export default Rows
