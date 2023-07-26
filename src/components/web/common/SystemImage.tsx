/* eslint-disable @next/next/no-img-element */
import React, {
  type DetailedHTMLProps,
  type FC,
  type ImgHTMLAttributes,
  useEffect,
  useState
} from 'react'

const SystemImage: FC<SystemImageProps> = (props) => {
  const [
    base64Image,
    setBase64Image
  ] = useState<string>('')
  useEffect(
    () => {
      const setImage = async (): Promise<void> => {
        const image = await window.getBase64Image(props.filepath)
        setBase64Image(image)
      }
      void setImage()
    },
    [props.filepath]
  )
  return <img {...props} alt={props.alt} src={base64Image} />
}

export default SystemImage

interface SystemImageProps extends
  Omit<DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>, 'src'> {
  filepath: string
}
