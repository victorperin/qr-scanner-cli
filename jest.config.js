module.exports = {
  preset: 'ts-jest',
  clearMocks: true,
  // collectCoverage: true,
  // collectCoverageFrom: ['src/**'],
  // coverageReporters: ['lcov', 'text'],
  // coverageDirectory: 'coverage',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/tests/**/*.test.ts', '<rootDir>/src/**/*.test.ts'],
  verbose: true,
  globals: {
    'ts-jest': { compiler: 'ttypescript' },
  },
}
