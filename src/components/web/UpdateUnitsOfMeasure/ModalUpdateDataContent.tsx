/* eslint-disable max-lines-per-function */
import React, { type FC, Fragment, useCallback, useContext } from 'react'
import { ModalUpdateDataContext } from 'context/ModalUpdateDataContext'
import { type RootState } from 'redux/store'
import UpdateUnitOfMeasureType from './UpdateUnitOfMeasureType'
import UpdateUnitsOfMeasure from './UpdateUnitsOfMeasure'
import { useSelector } from 'react-redux'

const ModalUpdateDataContent: FC = () => {
  const modalContext = useContext(ModalUpdateDataContext)
  const { uomGroupedByType, unitsOfMeasureType } =
    useSelector((state: RootState) => state.unitsOfMeasure)
  const selectedUomt = useCallback(
    () => uomGroupedByType[Number(modalContext.groupingElementIndex)],
    [
      uomGroupedByType,
      modalContext.groupingElementIndex
    ]
  )()

  return <>
    <UpdateUnitOfMeasureType
      id={selectedUomt?.uomt_id}
      name={selectedUomt?.uomt_name}
      uomtExistent={unitsOfMeasureType}
      groupingElementIndex={modalContext.groupingElementIndex as number}
    />
    {selectedUomt?.uom.map(({ abbreviation, id, name }, elementIndex) => <Fragment key={id}>
      <UpdateUnitsOfMeasure
        abbreviation={abbreviation}
        id={id}
        name={name}
        uomt_id={selectedUomt?.uomt_id}
        unitsOfMeasureTypes={unitsOfMeasureType}
        unitsOfMeasure={selectedUomt?.uom}
        elementIndex={elementIndex}
        groupingElementIndex={modalContext.groupingElementIndex as number}
      />
    </Fragment>)}
  </>
}

export default ModalUpdateDataContent
