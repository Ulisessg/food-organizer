/**
 * Get regex for input patter to exclude words
 *
 * words must be sparated with pipe "|"
 * @param {string[]} words
 *  @example
 * const wordsToExclude = 'sky|sea|day'
 * const patternToExlcudeWords =
 *  getPatterExcludeWords(wordsToExclude) // ^[a-zA-Z]((?!sky|sea|day|\d).)*$
 */
const getPatterExcludeWords = (config: Config): string => {
  let pattern: string = '^[a-zA-Z]((?!'
  config.wordsToExclude?.forEach((word, index) => {
    if (word === config.ignoreWord) return
    if (index === config.wordsToExclude.length - 1) {
      pattern += `${word.toLowerCase()}`
    } else {
      pattern += `${word.toLowerCase()}|`
    }
  })
  pattern += '|\\d).)*$'
  return pattern
}

interface Config {
  wordsToExclude: string[]
  ignoreWord: string
}

export default getPatterExcludeWords
