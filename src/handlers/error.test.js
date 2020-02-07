const { scanFromFile } = require('./error')

describe('error handler', () => {
  describe('scanFromFile', () => {
    it('should throw generic error if unknown error is received', () => {
      const expectedResult = new Error('test error')

      const functionToTest = () => scanFromFile('SOME PATH')(expectedResult)

      expect(functionToTest).toThrowError(expectedResult)
    })

    it('should throw warning if "0 patterns found" is received', () => {
      const input = '0 patterns found'

      const functionToTest = () => scanFromFile('SOME PATH')(input)

      expect(functionToTest).toThrowError('[WARNING]')
    })

    it('should throw error if error "no such file or directory" is received', () => {
      const input = new Error('no such file or directory')

      const functionToTest = () => scanFromFile('SOME PATH')(input)

      expect(functionToTest).toThrowError('[ERROR] File <SOME PATH> not found!')
    })
  })
})
