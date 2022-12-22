import { getProduct } from '../../api'
import { parseRequestURL } from '../../utils'
import styles from './CreateOrderModal.module.scss'

import {
  checkIsUserNameValid,
  checkIsPhoneNumberValid,
  checkIsAddressValid,
  checkIsEmailValid,
  checkIsCardNumberValid,
  checkIsCvvValid,
} from './modules/fieldsValidate'
import { checkCardTerm } from './modules/cardTerm'
import { cardNumberSeparation } from './modules/helpers'
import { setCardImage } from './modules/setCardImage'

export default {
  render: async () => {
    const { id } = parseRequestURL(location.hash.slice(1).toLowerCase())
    const product = await getProduct(id)

    return `
        <div class=${styles.formWrapper} id=formWrapper>
          <form class=${styles.form} id='form'>
            <div class=${styles.formHeader}>Ordering</div> 
            <div class=${styles.wrapperInput}>
              <input type=text id='userName' class='${styles.formInput} input' placeholder='First and last name'>
              <span>Error message</span>
            </div>
            <div class='${styles.wrapperInput}'>
              <input type="number" id=phone class='${styles.formInput} input' placeholder='Phone number'>
              <span>Error message</span>
            </div>
            <div class=${styles.wrapperInput}>
              <input type="text" id='address' class='${styles.formInput} input' placeholder='Delivery address'>
              <span>Error message</span>
            </div>
            <div class=${styles.wrapperInput}>
              <input type=email  id=email class='${styles.formInput} input' placeholder='E-mail'>
              <span>Error message</span>
            </div>

            <div class=${styles.card}>
              <img class=${styles.map} src='../../assets/images/map.png'/>
              <div class=${styles.cardHeader}>
                <img class=${styles.chip} src='../../assets/images/chip.png'/>
                <img class=${styles.cardLogo} id=cardLogo src='' />
              </div>
              <div class=${styles.wrapperInput}>
                <input type="text"
                 onkeypress="if(this.value.length==19 && event.keyCode>47 && event.keyCode < 58) return false; return (event.charCode !=8 && event.charCode ==0 || (event.charCode >= 48 && event.charCode <= 57))"
                  class=${styles.cardNumberInput}
                  id=cardNumber
                  placeholder='**** **** **** ****'
                <span><span>
              </div>
              <div class=${styles.cardInfo}>
                <div class=${styles.expWrapper}>
                  <input autocomplete="off" class=${styles.exp} id="month" maxlength="2" pattern="[0-9]*" inputmode="numerical" placeholder="MM" type="text" data-pattern-validate />
                  <input autocomplete="off" class=${styles.exp} id="year" maxlength="2" pattern="[0-9]*" inputmode="numerical" placeholder="YY" type="text" data-pattern-validate />
                </div>
                <div>
                  <input type=number class=${styles.cvvInput} id=cvv placeholder='CVV' oninput="validity.valid||(value='')" onKeyDown="if(this.value.length==3 && event.keyCode>47 && event.keyCode < 58) return false;">
                </div>
              </div>
            </div>


            <div class=${styles.total}>Total: ${product.price}$</div>
            <button class=${styles.formBtn}>CONFIRM</button>
          </form>
        </div>
        <div class=${styles.blackout} id='blackout'></div>
    `
  },

  afterRender: async () => {
    const buyNow = document.getElementById('buyNow')
    const formWrapper = document.getElementById('formWrapper')
    const body = document.querySelector('body')
    const blackout = document.getElementById('blackout') as HTMLElement

    buyNow?.addEventListener('click', () => {
      formWrapper?.classList.toggle(`${styles.visibleForm}`)
      body?.classList.toggle(`${styles.lock}`)

      if ([...blackout.classList].includes(`${styles.blackoutActive}`)) {
        blackout.classList.remove(`${styles.blackoutActive}`)
      } else {
        blackout.classList.add(`${styles.blackoutActive}`)
      }
    })

    blackout.addEventListener('click', () => {
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

    form?.addEventListener('submit', (e: SubmitEvent) => {
      e.preventDefault()
      checkInputs()
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
    }

    checkCardTerm()

    cardNumber.addEventListener('keyup', (e: KeyboardEvent) => {
      const splittedCardNumber = cardNumberSeparation(cardNumber.value)
      const firstValueNumber = cardNumber.value.slice(0, 1)

      const targetValue = e.target as HTMLInputElement
      targetValue.value = splittedCardNumber

      setCardImage(firstValueNumber)
    })
  },
}
