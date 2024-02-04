/**
 * @type {import('@stryker-mutator/api/core').StrykerOptions}
 */
module.exports = {
  _comment:
    "This config was generated using 'stryker init'. Please take a look at: https://stryker-mutator.io/docs/stryker-js/configuration/ for more information.",
  packageManager: 'npm',
  reporters: ['html', 'clear-text', 'progress'],
  testRunner: 'jest',
  testRunner_comment:
    'Take a look at https://stryker-mutator.io/docs/stryker-js/jest-runner for information about the jest plugin.',
  coverageAnalysis: 'perTest',
  plugins: ['@stryker-mutator/jest-runner'],
}
