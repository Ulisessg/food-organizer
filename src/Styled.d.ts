import 'styled-components'
import Theme from 'd-system/dist/Theme'

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
