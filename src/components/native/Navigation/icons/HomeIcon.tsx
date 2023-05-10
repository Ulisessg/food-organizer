/* eslint-disable max-len */
import React, { type FC } from 'react'
import Svg, { Path, type SvgProps } from 'react-native-svg'
import { Link } from 'expo-router'
import { TouchableOpacity } from 'react-native'
import { theme } from 'd-system/dist/native'

const HomeIcon: FC = (props: SvgProps) => (
  <Link href="/" asChild>
    <TouchableOpacity>
    <Svg
        width={theme.spacing * 5}
        height={theme.spacing * 5} viewBox="0 0 256 256"><Path fill="black" d="m218.83 103.77l-80-75.48a1.14 1.14 0 0 1-.11-.11a16 16 0 0 0-21.53 0l-.11.11l-79.91 75.48A16 16 0 0 0 32 115.55V208a16 16 0 0 0 16 16h48a16 16 0 0 0 16-16v-48h32v48a16 16 0 0 0 16 16h48a16 16 0 0 0 16-16v-92.45a16 16 0 0 0-5.17-11.78ZM208 208h-48v-48a16 16 0 0 0-16-16h-32a16 16 0 0 0-16 16v48H48v-92.45l.11-.1L128 40l79.9 75.43l.11.1Z"/></Svg>
    </TouchableOpacity>
  </Link>
)
export default HomeIcon
