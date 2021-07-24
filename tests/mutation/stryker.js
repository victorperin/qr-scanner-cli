// eslint-disable-next-line @typescript-eslint/no-var-requires
const { StrykerCli } = require('@stryker-mutator/core')

process.env.STRYKER_TEST = 'true'

new StrykerCli([...process.argv, 'run']).run()
