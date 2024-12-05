module.exports = {
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest', 
  },
  moduleFileExtensions: ['js', 'jsx'], 
  testEnvironment: 'jsdom', 
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  transformIgnorePatterns: [
    '/node_modules/(?!axios|your-other-esm-dependencies)/', 
  ],
};
