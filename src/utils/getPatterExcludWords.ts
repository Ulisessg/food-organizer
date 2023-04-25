/**
 * Get regex for input patter to exclude words
 *
 * words must be sparated with pipe "|"
 * @param words - String
 *  @example
 * const wordsToExclude = 'sky|sea|day'
 * const patternToExlcudeWords =
 *  getPatterExcludeWords(wordsToExclude) // (?!\\bsky|sea|day\\b)
 */
const getPatterExcludeWords =
(wordsToExclude: string[]): string => {
  let pattern: string = ''
  wordsToExclude?.forEach((word) => {
    pattern += `(?!\\b${word.toLowerCase()}\\b)`
  })
  return pattern
}

export default getPatterExcludeWords
