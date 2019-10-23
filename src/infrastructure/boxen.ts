import boxen from 'boxen'

const doubleBorder = boxen.BorderStyle.Double 

const GREEN_BOX_CONFIG: boxen.Options = {
  padding: 1,
  borderStyle: doubleBorder,
  borderColor: 'green',
}

export const greenBox = (text: string, { margin = 0 } = {}) => 
  boxen(text, { ...GREEN_BOX_CONFIG, margin })
