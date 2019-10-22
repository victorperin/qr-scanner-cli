/**
 * @type {import('meow').Options['flags']}
 */
const flags = {
  clear: { type: 'boolean', alias: 'c' },
  clipboard: { type: 'boolean', alias: 'p' },
}

/**
 * @typedef {{clear:boolean, clipboard:boolean}} } Flags
 */

module.exports = flags
