const Sqlite3 = require('better-sqlite3')
const path = require('path')

/**
 * @type {import('better-sqlite3').Database}
 */
let dbSingleton = null

/**
 * @returns {import('better-sqlite3').Database}  Database
 */
const electronOpenDb = () => {
  if (dbSingleton !== null) {
    return dbSingleton
  }
  dbSingleton = new Sqlite3(
    path.join(
      __dirname,
      'food_organizer.db'
    ),
    {
      fileMustExist: true
    }
  )
  dbSingleton.pragma('journal_mode = WAL')
  return dbSingleton
}

module.exports = electronOpenDb
