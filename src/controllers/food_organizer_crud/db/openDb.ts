/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable security/detect-non-literal-require */
import * as FileSystem from 'expo-file-system'
import * as SQLite from 'expo-sqlite'
import { Asset } from 'expo-asset'
import { dbName } from '../../../utils/constants'

const openDb = async (): Promise<SQLite.WebSQLDatabase | Error> => {
  try {
    const internalDbName = dbName
    const sqlDir = `${FileSystem.documentDirectory as string}SQLite/`

    if (!(await FileSystem.getInfoAsync(sqlDir + internalDbName)).exists) {
      await FileSystem.makeDirectoryAsync(
        sqlDir,
        { intermediates: true }
      )
      const asset = Asset.fromModule(require('./food_organizer.db'))
      await FileSystem.downloadAsync(
        asset.uri,
        sqlDir + internalDbName
      )
    }
    return SQLite.openDatabase(internalDbName)
  } catch (error) {
    return error as Error
  }
}

export default openDb
