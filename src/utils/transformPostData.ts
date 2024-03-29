import dayjs from 'dayjs'

const transformPostData = <
DataType extends Omit<Record<string, any>, 'creationDate'>>(data: DataType):
  transformPostDataReturn<DataType> => {
  const creationDate: string = dayjs().toISOString()
  return {
    ...data,
    creation_date: creationDate
  }
}

type transformPostDataReturn<DataType extends Record<string, any>>
= DataType & { creation_date: string }

export default transformPostData
