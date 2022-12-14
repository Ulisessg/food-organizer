import dayjs from 'dayjs'

const transformPostData = <DataType extends Object>(data: DataType):
transformPostDataReturn<DataType> => {
  const creationDate: string = dayjs().toISOString()
  return {
    ...data,
    creation_date: creationDate
  }
}

type transformPostDataReturn<DataType extends {}> = DataType & { creation_date: string }

export default transformPostData
