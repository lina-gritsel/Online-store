import { cardNumberSeparation } from '../components/CreateOrderModal/modules/helpers'
import {
  isNumberValue,
  isEmpty,
  isEmail,
  isValidLength,
  isIncludeNumber,
  validatePhoneNumber,
  validateUserName,
  validateAddress,
} from './validateValue'

describe('Check number', () => {
  it('must contain only numbers', () => {
    const testCase = [
      { a: 'aaaaa', expected: true },
      { a: 'aaa7a', expected: true },
      { a: '', expected: true },
      { a: '7586754', expected: false },
    ]
    testCase.forEach(({ a, expected }) => {
      const result = isNumberValue(a)
      expect(result).toBe(expected)
    })
  })
})

describe('Check empty string', () => {
  it('string must not be empty', () => {
    const testCase = [
      { a: 'string', expected: false },
      { a: '784848', expected: false },
      { a: './+=,', expected: false },
      { a: '', expected: true },
    ]
    testCase.forEach(({ a, expected }) => {
      const result = isEmpty(a)
      expect(result).toBe(expected)
    })
  })
})

describe('Is email', () => {
  it('this is not a valid email', () => {
    const testCase = [
      { a: 'noemail', expected: false },
      { a: '784848', expected: false },
      { a: 'myemail@jh', expected: false },
      { a: 'myemail@mail.ru', expected: true },
    ]
    testCase.forEach(({ a, expected }) => {
      const result = isEmail(a)
      expect(result).toBe(expected)
    })
  })
})

describe('Check validate length', () => {
  it('this is not a valid length', () => {
    const testCase = [
      { a: 'lot', b: 1, expected: false },
      { a: 'lotlot', b: 5, expected: false },
      { a: 'nice', b: 5, expected: true },
    ]
    testCase.forEach(({ a, b, expected }) => {
      const result = isValidLength(a, b)
      expect(result).toBe(expected)
    })
  })
})

describe('break a string', () => {
  it('the line is broken like me', () => {
    const testCase = [
      { a: '12345678', expected: '1234 5678' },
      { a: '123456781234', expected: '1234 5678 1234' },
      { a: '12 3456 78 1234', expected: '1234 5678 1234' },
      { a: 'postavte 200', expected: 'post avte 200' },
    ]
    testCase.forEach(({ a, expected }) => {
      const result = cardNumberSeparation(a)
      expect(result).toBe(expected)
    })
  })
})

describe('only string', () => {
  it('must contain only letters', () => {
    const testCase = [
      { a: ['pop', 'rock'], expected: false },
      { a: ['yua', 'hoty', 'est'], expected: false },
      { a: ['true', 'true', '567'], expected: true },
    ]
    testCase.forEach(({ a, expected }) => {
      const result = isIncludeNumber(a)
      expect(result).toBe(expected)
    })
  })
})

describe('only string', () => {
  it('must contain only letters', () => {
    const testCase = [
      { a: ['pop', 'rock'], expected: false },
      { a: ['yua', 'hoty', 'est'], expected: false },
      { a: ['true', 'true', '567'], expected: true },
    ]
    testCase.forEach(({ a, expected }) => {
      const result = isIncludeNumber(a)
      expect(result).toBe(expected)
    })
  })
})

describe('check phone number', () => {
  it('validate phone number', () => {
    const testCase = [
      { a: '', expected: 'Phone number cannot be blank' },
      { a: 'false', expected: 'Expected value of a digit' },
      { a: '5657565', expected: 'Required "+" at the beginning' },
      { a: '+5665', expected: 'Minimum length 9' },
    ]
    testCase.forEach(({ a, expected }) => {
      const result = validatePhoneNumber(a)
      expect(result).toBe(expected)
    })
  })
})

describe('check user name', () => {
    it('validate user name', () => {
      const testCase = [
        { a: '', expected: 'Phone number cannot be blank' },
        { a: '5657565', expected: 'Enter the string' },
        { a: 'Name', expected: 'Required number of words - 2' },
        { a: 'lot n', expected: 'Name length of at least 3 characters' },

      ]
      testCase.forEach(({ a, expected }) => {
        const result = validateUserName(a)
        expect(result).toBe(expected)
      })
    })
  })
  
  describe('check address', () => {
    it('validate address', () => {
      const testCase = [
        { a: '', expected: 'Address cannot be blank' },
        { a: '5657565', expected: 'Enter the string' },
        { a: 'Home', expected: 'Too short address' },
        { a: 'hom hom n', expected: 'Insufficient number of characters' },

      ]
      testCase.forEach(({ a, expected }) => {
        const result = validateAddress(a)
        expect(result).toBe(expected)
      })
    })
  })
  