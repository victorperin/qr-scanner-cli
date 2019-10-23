import boxen from 'boxen'

const GREEN_BOX_CONFIG: boxen.Options = {
  padding: 1,
  borderStyle: boxen.BorderStyle.Double,
  borderColor: 'green',
}

export const greenBox = (text: string, { margin }: { margin: number } = { margin: 0 }) =>
  boxen(text, { ...GREEN_BOX_CONFIG, margin })
