module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: ['node_modules/(?!@gluestack-ui)/'],
  setupFilesAfterEnv: ['./jest-setup.js'],
};
