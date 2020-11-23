module.exports = {
  preset: 'ts-jest',
  clearMocks: true,
  // collectCoverage: true,
  // collectCoverageFrom: ['src/**'],
  // coverageReporters: ['lcov', 'text'],
  // coverageDirectory: 'coverage',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/tests/**/*.test.(t|j)s', '<rootDir>/src/**/*.test.(t|j)s'],
  verbose: true,
  globals: {
    'ts-jest': { compiler: 'ttypescript' },
  },
}
