/* eslint-disable max-lines-per-function */
/* eslint-disable max-statements */
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
import ModalContent from './ModalContent'
import { ModalContext } from 'context/ModalContext'
import {
  ModalUpdateTable
} from 'components/common/ModalUpdateData'

import { type RootState } from 'redux/store'
import { useSelector } from 'react-redux'

const Rows: FC = () => {
  const [
    uomtIndex,
    setUomtIndex
  ] = useState<number | null>(null)
  const modalRef = useRef<HTMLDivElement>()
  const modalContext = useContext(ModalContext)
  const unitsOfMeasureData = useSelector((state: RootState) => state.unitsOfMeasure)

  const getDataFromTableToModify = (ev: MouseEvent<HTMLButtonElement>): void => {
    const uomtIdx = ev.currentTarget.getAttribute('data-grouping-element-index')
    setUomtIndex(uomtIdx as any)
    modalContext.openModal()
  }

  // eslint-disable-next-line security/detect-object-injection
  const selectedUomt = unitsOfMeasureData?.uomGroupedByType[uomtIndex as number]

  useEffect(
    () => {
      modalRef.current = document.querySelector('.ReactModalPortal') as HTMLDivElement
    },
    [modalContext.modalIsOpen]
  )

  return <>
  <ModalUpdateTable
    modalProps={{
      isOpen: modalContext.modalIsOpen,
      onRequestClose: modalContext.closeModal
    }}
    formProps={{
      formTitle: 'Actualizar unidades de medida'
    }}
    cancellButtonProps={{
      size: 'small',
      text: 'Cancelar',
      type: 'button'
    }}
    continueButtonProps={{
      size: 'small',
      text: 'Actualizar',
      type: 'button'
    }}
    thunks={{
      units_of_measure: updateUnitOfMeasureThunk as any,
      units_of_measure_type: updateUomtThunk as any
    }}
  >
    <ModalContent
      selectedUomt={selectedUomt}
      unitOfMeasureTypeIndex={uomtIndex as number}
    />

  </ModalUpdateTable>
  {/* Display data */}

  {unitsOfMeasureData.uomGroupedByType.map((uomt, uomtIdx) => <Fragment key={uomt.uomt_id}>
        {uomt.uom.map(({ abbreviation, id, name }, uomGroupedIndex) => <Fragment key={id}>
          {uomGroupedIndex === 0 && <RowWithSpan
            rowSpan={uomt.uom.length}
            uomAbbreviation={abbreviation}
             uomName={name}
             uomtId={uomt.uomt_id}
             uomtName={uomt.uomt_name}
             openModal={getDataFromTableToModify}
             groupingElementIndex={uomtIdx}
             elementIndex={uomGroupedIndex}
          />}
          {uomGroupedIndex !== 0 && <RowNoSpan
            groupingElementIndex={uomtIdx}
            uomAbbreviation={abbreviation}
            uomName={name}
            uomtName={uomt.uomt_name}
            elementIndex={uomGroupedIndex}
           />}
        </Fragment>)}

    </Fragment>)}

  </>
}

export default Rows
