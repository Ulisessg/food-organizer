import 'styled-components'
import type Theme from 'd-system/dist/Theme'

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
