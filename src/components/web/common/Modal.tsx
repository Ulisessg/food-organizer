import ModalComponent,
{ type Props, type Styles } from 'react-modal'
import { type FC } from 'react'
ModalComponent.setAppElement('#__next')

const modalStyles: Styles = {
  content: {
    alignContent: 'baseline',
    borderRadius: '30px',
    display: 'grid',
    gridRowGap: '15px',
    inset: '10px',
    justifyContent: 'center',
    justifyItems: 'center',
    overflow: 'scroll',
    position: 'fixed'
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.4)'
  }
}

const Modal: FC<Props> = (props) => <ModalComponent
  {...props}
  style={modalStyles}
>
  {props.children}
</ModalComponent>

export default Modal
