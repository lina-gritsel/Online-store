import { clearAllValues } from '../../pages/CartPage/Cart/clearAllValues'
import { dropProductFromCart } from './dropProductFromCart'
import { cardNumberSeparation } from './modules/helpers'
import { clearLocalStorage } from './clearLocalStorage'
import { btnBuyProductNow } from './btnBuyProductNow'
import { setCardImage } from './modules/setCardImage'
import { checkCardTerm } from './modules/cardTerm'
import { Products } from './../../api/types'
import {
  checkIsUserNameValid,
  checkIsPhoneNumberValid,
  checkIsAddressValid,
  checkIsEmailValid,
  checkIsCardNumberValid,
  checkIsMonthValid,
  checkIsYearValid,
  checkIsCvvValid,
} from './modules/fieldsValidate'

import styles from './CreateOrderModal.module.scss'

type useOrderModal = () => void

export const useOrderModal: useOrderModal = () => {
  const product: Products = JSON.parse(
    localStorage.getItem('product') as string,
  )

  const buyNow = document.getElementById('buyNow')
  const formWrapper = document.getElementById('formWrapper')
  const body = document.querySelector('body')
  const blackout = document.getElementById('blackout') as HTMLElement
  const hidden = document.getElementById('hidden') as HTMLElement
  const totalPrice = document.getElementById('totalPrice') as HTMLDivElement
  const popupWrapper = document.getElementById('popupWrapper') as HTMLDivElement

  let isOrderingForOneProduct = false
  let checkSuccessArr: boolean[] = []

  if (window.location.hash !== '#/cart') {
    btnBuyProductNow()
  } else {
    isOrderingForOneProduct = JSON.parse(
      localStorage.getItem('isOrdering') as string,
    )

    if (isOrderingForOneProduct) {
      formWrapper?.classList.toggle(`${styles.visibleForm}`)
      body?.classList.toggle(`${styles.lock}`)
      totalPrice.innerHTML = `Total: ${product.price}$`

      if ([...blackout.classList].includes(`${styles.blackoutActive}`)) {
        blackout.classList.remove(`${styles.blackoutActive}`)
      } else {
        blackout.classList.add(`${styles.blackoutActive}`)
      }
    }

    buyNow?.addEventListener('click', () => {
      formWrapper?.classList.toggle(`${styles.visibleForm}`)
      body?.classList.toggle(`${styles.lock}`)

      const promoTotal = document.getElementById(
        'promoTotal',
      ) as HTMLParagraphElement
      const total = document.getElementById('total') as HTMLParagraphElement

      if (promoTotal.style.display == 'block') {
        totalPrice.innerHTML = `${promoTotal.textContent}`
      } else {
        totalPrice.innerHTML = `${total.textContent}`
      }
      if ([...blackout.classList].includes(`${styles.blackoutActive}`)) {
        blackout.classList.remove(`${styles.blackoutActive}`)
      } else {
        blackout.classList.add(`${styles.blackoutActive}`)
      }
    })
  }

  blackout.addEventListener('click', () => {
    isOrderingForOneProduct = false
    localStorage.setItem('isOrdering', JSON.stringify(isOrderingForOneProduct))

    formWrapper?.classList.remove(`${styles.visibleForm}`)
    blackout.classList.remove(`${styles.blackoutActive}`)
    body?.classList.remove(`${styles.lock}`)
  })

  const form = document.getElementById('form')
  const userName = document.getElementById('userName') as HTMLInputElement
  const phone = document.getElementById('phone') as HTMLInputElement
  const address = document.getElementById('address') as HTMLInputElement
  const email = document.getElementById('email') as HTMLInputElement
  const cardNumber = document.getElementById('cardNumber') as HTMLInputElement
  const month = document.getElementById('month') as HTMLInputElement
  const year = document.getElementById('year') as HTMLInputElement
  const cvv = document.getElementById('cvv') as HTMLInputElement

  const returnToMainPage = () => {
    if (isOrderingForOneProduct) {
      isOrderingForOneProduct = false
      localStorage.setItem(
        'isOrdering',
        JSON.stringify(isOrderingForOneProduct),
      )

      dropProductFromCart()
    } else {
      clearAllValues()
      clearLocalStorage()
    }

    formWrapper?.classList.remove(`${styles.visibleForm}`)
    blackout.classList.remove(`${styles.blackoutActive}`)
    body?.classList.remove(`${styles.lock}`)

    popupWrapper.style.display = 'flex'
    hidden.classList.add(styles.activeHidden)
    setTimeout(() => {
      window.location.hash = '#/'
      window.location.reload()
    }, 3000)
  }

  let isSuccessUserName = false
  let isSuccessPhone = false
  let isSuccessAddress = false
  let isSuccessEmail = false
  let isSuccessCardNum = false
  let isSuccessMonth = false
  let isSuccessYear = false
  let isSuccessCvv = false

  form?.addEventListener('submit', (e: SubmitEvent) => {
    e.preventDefault()
    checkInputs()

    const isTrue = (value: boolean) => value === true

    if (checkSuccessArr.every(isTrue)) {
      returnToMainPage()
    }
  })

  const checkInputs = (): void => {
    const userNameValue = userName.value.trim()
    const phoneValue = phone.value.trim()
    const addressValue = address.value.trim()
    const emailValue = email.value.trim()
    const cardNumberValue = cardNumber.value.trim()
    const monthValue = month.value.trim()
    const yearValue = year.value.trim()
    const cvvValue = cvv.value.trim()

    checkIsUserNameValid(userNameValue)
    checkIsPhoneNumberValid(phoneValue)
    checkIsAddressValid(addressValue)
    checkIsEmailValid(emailValue)
    checkIsCardNumberValid(cardNumberValue)
    checkIsMonthValid(monthValue)
    checkIsYearValid(yearValue)
    checkIsCvvValid(cvvValue)

    let userNameWrapper = userName.parentElement as HTMLInputElement
    let phoneWrapper = phone.parentElement as HTMLInputElement
    let addressWrapper = address.parentElement as HTMLInputElement
    let emailWrapper = email.parentElement as HTMLInputElement
    let cardNumWrapper = cardNumber.parentElement as HTMLInputElement
    let monthWrapper = month.parentElement as HTMLInputElement
    let yearWrapper = year.parentElement as HTMLInputElement
    let cvvWrapper = cvv.parentElement as HTMLInputElement

    isSuccessUserName = userNameWrapper.classList.contains('isSuccess')
    isSuccessPhone = phoneWrapper.classList.contains('isSuccess')
    isSuccessAddress = addressWrapper.classList.contains('isSuccess')
    isSuccessEmail = emailWrapper.classList.contains('isSuccess')
    isSuccessCardNum = cardNumWrapper.classList.contains('isSuccess')
    isSuccessMonth = monthWrapper.classList.contains('isSuccess')
    isSuccessYear = yearWrapper.classList.contains('isSuccess')
    isSuccessCvv = cvvWrapper.classList.contains('isSuccess')

    checkSuccessArr = []
    checkSuccessArr.push(
      isSuccessUserName,
      isSuccessPhone,
      isSuccessAddress,
      isSuccessEmail,
      isSuccessCardNum,
      isSuccessMonth,
      isSuccessYear,
      isSuccessCvv,
    )
  }

  checkCardTerm()

  cardNumber?.addEventListener('keyup', (e: KeyboardEvent) => {
    const splittedCardNumber = cardNumberSeparation(cardNumber.value)
    const firstValueNumber = cardNumber.value.slice(0, 1)

    const targetValue = e.target as HTMLInputElement
    targetValue.value = splittedCardNumber

    setCardImage(firstValueNumber)
  })
}
