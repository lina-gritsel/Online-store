export const isNumberValue = (value: string): boolean => {
  return !/^\d+$/.test(value)
}

export const isEmpty = (value: string): boolean => {
  return !value
}

export const isEmail = (emailValue: string) => {
  return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    emailValue,
  )
}

export const isValidLength = (
    value: string | string[],
    maxLength: number,
  ): boolean => {
    return value.length < maxLength
  }

 export const isIncludeNumber = (value: string[]) => {
    return value.map((v) => /^[a-zA-Z]+$/.test(v)).includes(false)
  }

 export  const validatePhoneNumber = (phoneValue: string) => {
    const valueNumber = phoneValue.slice(1)
    const isExistPlus = phoneValue.slice(0, 1) === '+'
  
    if (isEmpty(phoneValue)) return 'Phone number cannot be blank'
    if (isNumberValue(valueNumber)) return 'Expected value of a digit'
    if (!isExistPlus) return 'Required "+" at the beginning'
    if (isValidLength(phoneValue, 9)) return 'Minimum length 9'
  }

 export const validateUserName = (userNameValue: string) => {
    if (isEmpty(userNameValue)) return 'Phone number cannot be blank'
  
    const splitUserName = userNameValue.split(' ')
    const validSplitNames = splitUserName.map((user) => user.length < 3)
  
    if (isIncludeNumber(splitUserName)) return 'Enter the string'
    if (isValidLength(splitUserName, 2)) return 'Required number of words - 2'
    if (validSplitNames.includes(true))
      return 'Name length of at least 3 characters'
  }
  
 export const validateAddress = (addressValue: string) => {
    const splitAddress = addressValue.split(' ')
    const validSplitAddress = splitAddress.map((address) => address.length < 5)
  
    if (isEmpty(addressValue)) return 'Address cannot be blank'
    if (isIncludeNumber(splitAddress)) return 'Enter the string'
    if (splitAddress.length < 3) return 'Too short address'
    if (validSplitAddress.includes(true))
      return 'Insufficient number of characters'
  }