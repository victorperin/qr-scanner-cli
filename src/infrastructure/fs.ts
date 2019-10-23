import { promisify } from 'util'
import { readFile as rf } from 'fs'

export const readFile = promisify(rf)
