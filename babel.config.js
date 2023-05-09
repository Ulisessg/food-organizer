/* eslint-disable func-names */
module.exports = function (api) {
  api.cache(true)
  return {
    plugins: [
      require.resolve('expo-router/babel'),
      [
        'module-resolver',
        {
          alias: {
            components: './src/components',
            context: './src/context',
            controllers: './src/controllers',
            hooks: './src/hooks',
            lib: './src/lib',
            models: './src/models',
            pages: './pages',
            src: './src',
            styles: './src/styles',
            utils: './src/utils'
          },
          root: '.'
        }
      ]
    ],
    presets: ['babel-preset-expo']
  }
}
