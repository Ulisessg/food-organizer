import React, { type FC } from 'react'
import { ModalUpdateData } from 'components/web/common/ModalUpdateData'
import UpdateFoods from './UpdateFoods'
import UpdateFoodsType from './UpdateFoodsType'

const index: FC = () => (
  <ModalUpdateData>
    <UpdateFoodsType />
    <UpdateFoods />
  </ModalUpdateData>
)

export default index
