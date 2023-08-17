/* eslint-disable @next/next/no-img-element */
import React, {
  type DetailedHTMLProps,
  type FC,
  type ImgHTMLAttributes,
  useEffect,
  useState
} from 'react'
import styled from 'styled-components'

const SystemImage: FC<SystemImageProps> = (props) => {
  const [
    base64Image,
    setBase64Image
  ] = useState<string>('')
  useEffect(
    () => {
      const setImage = async (): Promise<void> => {
        const image = await window.getBase64Image(
          props.fileName,
          props.imageIsInTemporal,
          props.table
        )
        setBase64Image(image)
      }
      void setImage()
    },
    [
      props.fileName,
      props.imageIsInTemporal,
      props.table
    ]
  )
  return <SystemImageStyles
    {...props as any}
    alt={props.alt}
    src={base64Image}
    imageLength={base64Image.length} />
}

const SystemImageStyles = styled.img<{ imageLength: number }>`
  object-fit: contain;
  width: 120px;
  height: 120px;
  display: ${({ imageLength }) => {
    if (imageLength === 0) return 'none'
    return 'initial'
  }};
`

export default SystemImage

interface SystemImageProps extends
  Omit<DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>, 'src'> {
  fileName: string
  imageIsInTemporal: boolean
  table: string
}
