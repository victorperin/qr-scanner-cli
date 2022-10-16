import { scanFromFile, scanFromBitmap } from './error'

describe('error handler', () => {
  describe('scanFromFile', () => {
    it('should throw generic error if unknown error is received', () => {
      const expectedResult = new Error('test error')

      const functionToTest = () => scanFromFile('SOME PATH')(expectedResult)

      expect(functionToTest).toThrowError(expectedResult)
    })

    it('should throw error if error "no such file or directory" is received', () => {
      const input = new Error('no such file or directory')

      const functionToTest = () => scanFromFile('SOME PATH')(input)

      expect(functionToTest).toThrowError('[ERROR] File <SOME PATH> not found!')
    })

    it('should throw error if input is a string', () => {
      // Arrange
      const input = 'a generic error'

      // Act
      const functionToTest = () => scanFromFile('SOME PATH')(input)

      // Assert
      expect(functionToTest).toThrowError('a generic error')
    })
  })

  describe('scanFromBitmap', () => {
    it('should throw generic error if unknown error is received', () => {
      const expectedResult = new Error('test error')

      const functionToTest = () => scanFromBitmap(expectedResult)

      expect(functionToTest).toThrowError(expectedResult)
    })

    it('should throw generic error if unknown string is received', () => {
      const expectedResult = ''

      const functionToTest = () => scanFromBitmap(expectedResult)

      expect(functionToTest).toThrowError(/^$/)
    })

    it('should throw warning if "0 patterns found" is received', () => {
      const input = '0 patterns found'

      const functionToTest = () => scanFromBitmap(input)

      expect(functionToTest).toThrowError('[WARNING]')
    })

    it('should thow error from input', () => {
      // Arrange
      const input = new Error('a generic error')

      // Act
      const functionToTest = () => scanFromBitmap(input)

      // Assert
      expect(functionToTest).toThrowError(input)
    })
  })
})
