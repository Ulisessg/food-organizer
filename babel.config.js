/* eslint-disable func-names */
module.exports = function (api) {
  api.cache(true)
  return {
    plugins: [require.resolve('expo-router/babel')],
    presets: ['babel-preset-expo']
  }
}
