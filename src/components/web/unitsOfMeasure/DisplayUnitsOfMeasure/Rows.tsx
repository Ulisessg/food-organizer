/* eslint-disable max-lines-per-function */
/* eslint-disable max-statements */
import React, {
  type FC,
  Fragment
} from 'react'
import { RowNoSpan, RowWithSpan } from './Row'

import { type RootState } from 'redux/store'
import UpdateUnitsOfMeasure from '../UpdateUnitsOfMeasure'

import { useSelector } from 'react-redux'

const Rows: FC = () => {
  const unitsOfMeasureData = useSelector((state: RootState) => state.unitsOfMeasure)

  return <>
    <UpdateUnitsOfMeasure />

    {/* Display data */}
    {unitsOfMeasureData.uomGroupedByType
      .map((uomt, uomtIdx) => <Fragment key={`${uomt.uomt_id}${uomt.uomt_name}`}>
      {uomt.uom.map(({
        abbreviation,
        id,
        name
      }, uomGroupedIndex) => <Fragment key={`${id}${name}${abbreviation}`}>
        {uomGroupedIndex === 0 && <RowWithSpan
          rowSpan={uomt.uom.length}
          uomAbbreviation={abbreviation}
          uomName={name}
          uomtId={uomt.uomt_id}
          uomtName={uomt.uomt_name}
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

    </Fragment>)
   }
  </>
}

export default Rows
