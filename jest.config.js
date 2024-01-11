module.exports = {
  preset: 'ts-jest',
  clearMocks: true,
  // collectCoverage: true,
  // collectCoverageFrom: ['src/**'],
  // coverageReporters: ['lcov', 'text'],
  // coverageDirectory: 'coverage',
  setupFilesAfterEnv: ['./tests/setup.ts'],
  testEnvironment: 'node',
  testMatch: ['<rootDir>/tests/**/*.test.ts', '<rootDir>/src/**/*.test.ts'],
  modulePathIgnorePatterns: ['<rootDir>/dist/', '<rootDir>/coverage/', '<rootDir>/.nyc_output/'],
  verbose: true,
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        compiler: 'ts-patch/compiler',
      },
    ],
  },
}
