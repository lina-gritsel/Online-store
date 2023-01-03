import { clearAllValues } from '../../pages/CartPage/Cart/clearAllValues'
import { dropProductFromCart } from './dropProductFromCart'
import { cardNumberSeparation } from './modules/helpers'
import { clearLocalStorage } from './clearLocalStorage'
import { btnBuyProductNow } from './btnBuyProductNow'
import { setCardImage } from './modules/setCardImage'
import styles from './CreateOrderModal.module.scss'
import { checkCardTerm } from './modules/cardTerm'
import { Products } from './../../api/types'
import {
  checkIsUserNameValid,
  checkIsPhoneNumberValid,
  checkIsAddressValid,
  checkIsEmailValid,
  checkIsCardNumberValid,
  checkIsCvvValid,
} from './modules/fieldsValidate'

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

  let isSuccessUserName = userName.parentElement?.className !== 'undefined'
  let isSuccessPhone = userName.parentElement?.className !== 'undefined'
  let isSuccessAddress = userName.parentElement?.className !== 'undefined'
  let isSuccessEmail = userName.parentElement?.className !== 'undefined'
  let isSuccessCardNum = userName.parentElement?.className !== 'undefined'
  let isSuccessCvv = userName.parentElement?.className !== 'undefined'

  form?.addEventListener('submit', (e: SubmitEvent) => {
    e.preventDefault()
    checkInputs()

    if (
      isSuccessUserName &&
      isSuccessPhone &&
      isSuccessAddress &&
      isSuccessEmail &&
      isSuccessCardNum &&
      isSuccessCvv
    ) {
      returnToMainPage()
    }
  })

  const checkInputs = (): void => {
    const userNameValue = userName.value.trim()
    const phoneValue = phone.value.trim()
    const addressValue = address.value.trim()
    const emailValue = email.value.trim()
    const cardNumberValue = cardNumber.value.trim()
    const cvvValue = cvv.value.trim()

    checkIsUserNameValid(userNameValue)
    checkIsPhoneNumberValid(phoneValue)
    checkIsAddressValid(addressValue)
    checkIsEmailValid(emailValue)
    checkIsCardNumberValid(cardNumberValue)
    checkIsCvvValid(cvvValue)

    isSuccessUserName = userName.parentElement?.className !== 'undefined'
    isSuccessPhone = userName.parentElement?.className !== 'undefined'
    isSuccessAddress = userName.parentElement?.className !== 'undefined'
    isSuccessEmail = userName.parentElement?.className !== 'undefined'
    isSuccessCardNum = userName.parentElement?.className !== 'undefined'
    isSuccessCvv = userName.parentElement?.className !== 'undefined'
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
