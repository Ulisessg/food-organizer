/* eslint-disable max-len */
import { Path, Svg } from 'react-native-svg'
import React, { type FC } from 'react'
import { color, iconWidthAndHeight } from './constants'

const CupboardIcon: FC = () => (
  <Svg
    width={iconWidthAndHeight}
    height={iconWidthAndHeight}
    viewBox="0 0 24 24"
  >
    <Path fill={color} d="M17 2H7c-1.1 0-2 .9-2 2v15a2 2 0 0 0 2 2v1h2v-1h6v1h2v-1c1.11 0 2-.89 2-2V4a2 2 0 0 0-2-2m-7 16H8v-3h2v3m6 0h-2v-3h2v3m1-6H7V9h10v3m0-5H7V4h10v3Z"/></Svg>
)

export default CupboardIcon
