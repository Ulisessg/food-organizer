/* eslint-disable @next/next/no-img-element */
/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/naming-convention */
import React, { FC } from 'react'
import EditTableButtons from 'components/common/EditTableButtons'
import { Td } from 'd-system'

const Rows: FC<RowsProps> = ({
  food_name,
  food_type_name, image, preparation_time, score, rowSpan
}) => {
  const handleUpdate = (): void => console.log('Update')

  if (typeof rowSpan === 'number') {
    return <>
      <tr>
        <Td rowSpan={rowSpan}>{food_type_name}</Td>
        <Td>{food_name}</Td>
        <Td>{preparation_time}</Td>
        <Td>{score}</Td>
        {image === null && <Td>N/A</Td>}
        {image !== null && <Td><img src={image} alt={`${food_name} imagen`} /></Td>}
        <EditTableButtons onUpdate={handleUpdate}/>
      </tr>
    </>
  }
  return <>
    <tr>
      <Td>{food_name}</Td>
      <Td>{preparation_time}</Td>
      <Td>{score}</Td>
      {image === null && <Td>N/A</Td>}
      {image !== null && <img src={image} alt={`${food_name} imagen`} />}
      <EditTableButtons onUpdate={handleUpdate}/>
    </tr>
</>
}

interface RowsProps {
  food_type_name: string
  image: string | null
  score: number
  food_name: string
  preparation_time: number
  rowSpan?: number
}

export default Rows
