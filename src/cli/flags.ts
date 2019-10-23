import * as buildOptions from 'minimist-options';

const flagType: buildOptions.Type = 'boolean'

export const clear: buildOptions.Option = { type: flagType, alias: 'c' }
export const clipboard: buildOptions.Option = { type: flagType, alias: 'p' }
