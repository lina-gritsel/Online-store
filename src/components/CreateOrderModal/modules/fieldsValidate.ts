import styles from '../CreateOrderModal.module.scss'

 const isEmpty = (value: string): boolean => {
  return !value
}

const isNumberValue = (value: string): boolean => {
  return !/^\d+$/.test(value)
}

const isValidLength = (
  value: string | string[],
  maxLength: number,
): boolean => {
  return value.length < maxLength
}

const isIncludeNumber = (value: string[]) => {
  return value.map((v) => /^[a-zA-Z]+$/.test(v)).includes(false)
}

const isEmail = (emailValue: string) => {
  return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    emailValue,
  )
}

const validateUserName = (userNameValue: string) => {
  if (isEmpty(userNameValue)) return 'Phone number cannot be blank'

  const splitUserName = userNameValue.split(' ')
  const validSplitNames = splitUserName.map((user) => user.length < 3)

  if (isIncludeNumber(splitUserName)) return 'Enter the string'
  if (isValidLength(splitUserName, 2)) return 'Required number of words - 2'
  if (validSplitNames.includes(true))
    return 'Name length of at least 3 characters'
}

 const validatePhoneNumber = (phoneValue: string) => {
  const valueNumber = phoneValue.slice(1)
  const isExistPlus = phoneValue.slice(0, 1) === '+'

  if (isEmpty(phoneValue)) return 'Phone number cannot be blank'
  if (isNumberValue(valueNumber)) return 'Expected value of a digit'
  if (!isExistPlus) return 'Required "+" at the beginning'
  if (isValidLength(phoneValue, 9)) return 'Minimum length 9'
}

const validateAddress = (addressValue: string) => {
  const splitAddress = addressValue.split(' ')
  const validSplitAddress = splitAddress.map((address) => address.length < 5)

  if (isEmpty(addressValue)) return 'Address cannot be blank'
  if (isIncludeNumber(splitAddress)) return 'Enter the string'
  if (splitAddress.length < 3) return 'Too short address'
  if (validSplitAddress.includes(true))
    return 'Insufficient number of characters'
}

const validateEmail = (emailValue: string) => {
  if (isEmpty(emailValue)) return 'Email name cannot be blank'
  if (!isEmail(emailValue)) return 'Email is not valid'
}

const validateCardNumber = (cardValue: string) => {
  if (isEmpty(cardValue)) return 'Card Number cannot be blank'
  if (cardValue.length !== 19) return 'Card length 16 digits'
}

const validateMonthCard = (monthValue: string) => {
  if (isEmpty(monthValue)) return ' '
}

const validateYearCard = (yearValue: string) => {
  if (isEmpty(yearValue)) return ' '
}

const validateCvvCard = (cvvValue: string) => {
  if (isEmpty(cvvValue)) return 'CVV cannot be blank'
}

const setErrorFor = (input: HTMLInputElement, message: string) => {
  const formControl = input.parentElement as HTMLElement
  const span = formControl?.querySelector('span') as HTMLSpanElement
  span.innerText = message
  formControl.className = `${styles.error}`
  formControl.classList.add('isError')
}

const setErrorForDate = (input: HTMLInputElement) => {
  const formControl = input.parentElement as HTMLDivElement
  formControl.className = `${styles.error}`
  formControl.classList.add('isError')
}

const setSuccessFor = (input: HTMLInputElement) => {
  const formControl = input.parentElement as HTMLDivElement
  formControl.className = `${styles.success}`
  formControl.classList.add('isSuccess')
}

export const checkIsUserNameValid = (userNameValue: string): void => {
  const userName = document.getElementById('userName') as HTMLInputElement
  const message = validateUserName(userNameValue)

  if (message) {
    setErrorFor(userName, message)
  } else {
    setSuccessFor(userName)
  }
}

export const checkIsPhoneNumberValid = (phoneValue: string): void => {
  const phoneNumber = document.getElementById('phone') as HTMLInputElement
  const message = validatePhoneNumber(phoneValue)

  if (message) {
    setErrorFor(phoneNumber, message)
  } else {
    setSuccessFor(phoneNumber)
  }
}

export const checkIsAddressValid = (addressValue: string): void => {
  const adress = document.getElementById('address') as HTMLInputElement
  const message = validateAddress(addressValue)

  if (message) {
    setErrorFor(adress, message)
  } else {
    setSuccessFor(adress)
  }
}

export const checkIsEmailValid = (emailValue: string): void => {
  const email = document.getElementById('email') as HTMLInputElement
  const message = validateEmail(emailValue)

  if (message) {
    setErrorFor(email, message)
  } else {
    setSuccessFor(email)
  }
}

export const checkIsCardNumberValid = (emailValue: string) => {
  const cardNumber = document.getElementById('cardNumber') as HTMLInputElement
  const message = validateCardNumber(emailValue)

  if (message) {
    setErrorFor(cardNumber, message)
  } else {
    setSuccessFor(cardNumber)
  }
}

export const checkIsMonthValid = (monthValue: string) => {
  const month = document.getElementById('month') as HTMLInputElement
  const message = validateMonthCard(monthValue)

  if (message) {
    setErrorForDate(month)
  } else {
    setSuccessFor(month)
  }
}

export const checkIsYearValid = (yearValue: string) => {
  const year = document.getElementById('year') as HTMLInputElement
  const message = validateYearCard(yearValue)

  if (message) {
    setErrorForDate(year)
  } else {
    setSuccessFor(year)
  }
}

export const checkIsCvvValid = (cvvValue: string) => {
  const cvv = document.getElementById('cvv') as HTMLInputElement
  const message = validateCvvCard(cvvValue)

  if (message) {
    setErrorFor(cvv, message)
  } else {
    setSuccessFor(cvv)
  }
}
