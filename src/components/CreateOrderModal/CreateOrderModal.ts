import { getProduct } from '../../api'
import { parseRequestURL } from '../../utils'
import styles from './CreateOrderModal.module.scss'
import { FormField } from './Fields/Fields'
import { onCodeHandler, onlyNumberVoid, onCardNumberHandler} from './modules/validation'
import { MonthInput } from './Fields/MountInput'

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
            ${FormField.render({
              id: "userName",
              type: "text",
              placeholder:"First and last name"
            })}
            ${FormField.render({
              id: "phone",
              type: "text",
              placeholder:"Phone number"
            })}
            ${FormField.render({
              id: "address",
              type: "text",
              placeholder:"Delivery address"
            })}
            ${FormField.render({
              id: "email",
              type: "email",
              placeholder:"E-mail"
            })}
            <div class=${styles.card}>
              <img class=${styles.map} src='../../assets/images/map.png'/>
              <div class=${styles.cardHeader}>
                <img class=${styles.chip} src='../../assets/images/chip.png'/>
                <img class=${styles.cardLogo} id=cardLogo src='' />
              </div>
              <div class=${styles.wrapperInput}>
                <input 
                  type="text"
                  onkeypress="${onCardNumberHandler()}"
                  class=${styles.cardNumberInput}
                  id="cardNumber"
                  placeholder='**** **** **** ****'
                <span></span>
              </div>
              <div class=${styles.cardInfo}>
                <div class=${styles.expWrapper}>
                  ${MonthInput.render({
                    id:"month",
                    placeholder:"MM",
                  })}
                  ${MonthInput.render({
                    id:"year",
                    placeholder:"YY",
                    maxlength:"2" 
                  })}
                </div>
                <div>
                  <input
                  type="number"
                  class=${styles.cvvInput} 
                  id="cvv"
                  placeholder='CVV' 
                  oninput="${onlyNumberVoid()}" 
                  onKeyDown="${onCodeHandler()}">
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

    cardNumber?.addEventListener('keyup', (e: KeyboardEvent) => {
      const splittedCardNumber = cardNumberSeparation(cardNumber.value)
      const firstValueNumber = cardNumber.value.slice(0, 1)

      const targetValue = e.target as HTMLInputElement
      targetValue.value = splittedCardNumber

      setCardImage(firstValueNumber)
    })
  },
}
