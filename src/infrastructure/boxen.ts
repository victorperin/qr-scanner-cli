import boxen, { Options } from 'boxen'

const GREEN_BOX_CONFIG: Options = {
  padding: 1,
  borderStyle: 'double',
  borderColor: 'green',
}

export const greenBox = (text: string, { margin = 0 } = {}): string =>
  boxen(text, { ...GREEN_BOX_CONFIG, margin })

export default {
  greenBox,
}
