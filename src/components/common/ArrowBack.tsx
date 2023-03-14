import React, { type ComponentPropsWithoutRef, type FC, type KeyboardEvent, useState } from 'react'
import styled from 'styled-components'

const ArrowBack: FC<ArrowBackProps> = ({
  title,
  ...props
}) => {
  const [
    isEnterPressed,
    setIsEnterPressed
  ] = useState<boolean>(false)

  const handleKeyDown = (ev: KeyboardEvent<HTMLButtonElement>): void => {
    props.onKeyDown?.(ev)
    if (ev.key === 'Enter' || ev.key === ' ') {
      setIsEnterPressed(true)
    }
  }

  const handleOnKeyUp = (ev: KeyboardEvent<HTMLButtonElement>): void => {
    props.onKeyUp?.(ev)
    if (ev.key === 'Enter' || ev.key === ' ') {
      setIsEnterPressed(false)
      ev.target?.dispatchEvent(new globalThis.KeyboardEvent(
        'click',
        {
          repeat: false
        }
      ))
    }
  }

  return (
    <ArrowBackStyles
      {...props}
      title={title}
      isEnterPressed={isEnterPressed}
      onKeyDown={handleKeyDown}
      onKeyUp={handleOnKeyUp}
      isDisabled={props.disabled}
     >↶</ArrowBackStyles>
  )
}

interface ArrowBackProps extends ComponentPropsWithoutRef<'button'> {

  /** Text to accesibility pruposes */
  title: string
}

const ArrowBackStyles = styled.button<{
  isEnterPressed: boolean
  isDisabled: boolean | undefined
  hidden?: boolean
}>`
  text-align: center;
  display: ${({ hidden }) => {
    if (hidden === true) return 'hidden'
    return 'grid'
  }};
  justify-content: center;
  align-items: center;
  align-content: center;
  justify-items: center;
  padding-bottom: 10px;
  font-size: 40px;
  font-weight: bold;
  background-color: transparent;
  color:  ${({ theme }) => theme.colors.dark2};
  width: 30px;
  height: 30px;
  rotate: 90deg;
  justify-content: center;
  cursor: pointer;
  &:focus, &:hover, &:focus {
    ${({ isDisabled, theme }) => {
      if (isDisabled !== true) {
 return `outline: 2px solid ${theme.colors.light2};
      cursor: pointer;
      `
}
      return 'cursor: initial;'
    }}
  }
  ${({ isEnterPressed, isDisabled }) => (
    (
      isEnterPressed &&
      isDisabled === false) && 'transform: scale(0.85);')}

  &:active {
    ${({ isDisabled }) => {
      if (isDisabled !== true) return 'transform: scale(0.85);'
      return ''
    }}
  }
`

export default ArrowBack
