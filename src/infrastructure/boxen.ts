import boxen, { BorderStyle } from 'boxen'

const GREEN_BOX_CONFIG = {
  padding: 1,
  borderStyle: BorderStyle.Double,
  borderColor: 'green',
}

export const greenBox = (text: string, { margin = 0 } = {}): string =>
  boxen(text, { ...GREEN_BOX_CONFIG, margin })

export default {
  greenBox,
}
