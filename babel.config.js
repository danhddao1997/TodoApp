module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          tests: ['./tests/'],
          '@appRedux': 'src/appRedux/*',
          '@assets': 'src/assets/*',
          '@components': 'src/components/*',
          '@models': 'src/models/*',
          '@navigation': 'src/navigation/*',
          '@screens': 'src/screens/*',
          '@utils': 'src/utils/*',
        },
      },
    ],
  ],
};
