module.exports = {
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  moduleFileExtensions: ['js', 'jsx', 'json', 'vue', 'ts', 'tsx'],
  testMatch: ['**/tests/unit/**/*.spec.[jt]s?(x)'],
  transformIgnorePatterns: ['/node_modules/'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^~/(.*)$': '<rootDir>/$1',
  },
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{js,vue,ts}',
    '!jest.config.cjs',
  ],
  coverageReporters: ['html', 'text-summary'],
}
