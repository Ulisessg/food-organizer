/* eslint-disable @next/next/no-img-element */
/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/naming-convention */
import React, { type FC } from 'react'
import { ButtonOpenModal } from 'components/web/common/ModalUpdateData'
import { Td } from 'd-system'

const Rows: FC<RowsProps> = ({
  food_name,
  food_type_name,
  image,
  preparation_time,
  rowSpan,
  elementIndex,
  groupingElementIndex
}) => {
  if (typeof rowSpan === 'number') {
    return <>
      <tr>
        <Td rowSpan={rowSpan}>{food_type_name}</Td>
        <Td>{food_name}</Td>
        <Td>{preparation_time}</Td>
        <Td>
          <img
            src={image as string}
            alt={`${food_name} imagen`}
          />
        </Td>
        <Td rowSpan={rowSpan}>
          <ButtonOpenModal
            text="Editar"
            elementIndex={elementIndex}
            groupingElementIndex={groupingElementIndex}
            size="small"
          />
        </Td>
      </tr>
    </>
  }
  return <>
    <tr>
      <Td>{food_name}</Td>
      <Td>{preparation_time}</Td>
      <Td>
        <img
          src={image as any}
          alt={`${food_name} imagen`}
        />
      </Td>
    </tr>
</>
}

interface RowsProps {
  food_type_name: string
  image: string | null
  food_name: string
  preparation_time: number
  rowSpan?: number
  elementIndex: number
  groupingElementIndex: number | null

}

export default Rows
