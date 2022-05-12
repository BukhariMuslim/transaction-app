module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.js', '.jsx', '.json', '.svg', '.png'],
        alias: {
          '@root': '.',
          '@src': './src',
          '@components': './src/components',
          '@models': './src/models',
          '@navigations': './src/navigations',
          '@screens': './src/screens',
          '@stores': './src/stores',
          '@themes': './src/themes',
          '@utils': './src/utils',
        },
      },
    ],
  ],
};
