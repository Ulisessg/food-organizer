/* eslint-disable max-len */
import { Button, theme } from 'd-system/dist/native'
import { Modal, TouchableOpacity, View } from 'react-native'
import React, { type FC, useContext } from 'react'
import Svg, { Path, type SvgProps } from 'react-native-svg'
import { ModalContext } from 'context/ModalContext'

const CreateIcon: FC = (props: SvgProps) => {
  const { modalIsOpen, openModal, closeModal } = useContext(ModalContext)
  return (
    <>
    <TouchableOpacity onPress={openModal}>
    <Svg width={theme.spacing * 8}
          height={theme.spacing * 8} viewBox="0 0 256 256"><Path fill="black" d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24Zm0 192a88 88 0 1 1 88-88a88.1 88.1 0 0 1-88 88Zm48-88a8 8 0 0 1-8 8h-32v32a8 8 0 0 1-16 0v-32H88a8 8 0 0 1 0-16h32V88a8 8 0 0 1 16 0v32h32a8 8 0 0 1 8 8Z"/></Svg>
    </TouchableOpacity>
    <Modal
      visible={modalIsOpen}
      animationType="slide"
      onRequestClose={closeModal}
      transparent
    >
      <View style={{
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        marginTop: 22
      }}>
        <Button
          colorMessage="cancel"
          onPress={closeModal}
          size="small"
          text="X"
        />
      </View>

    </Modal>
    </>
  )
}

export default CreateIcon
