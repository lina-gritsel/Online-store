import { getProduct } from '../../api'
import { parseRequestURL } from '../../utils'
import styles from './CreateOrderModal.module.scss'

export default {
  render: async () => {
    const { id } = parseRequestURL(location.hash.slice(1).toLowerCase())
    const product = await getProduct(id)

  

    return `
        <div class=${styles.formWrapper} id=formWrapper>
          <form class=${styles.form} id='form'>
            <div class=${styles.formHeader}>Ordering</div> 
            <div class=${styles.wrapperInput}>
              <input type=text id='userName' class='${
                styles.formInput
              } input' placeholder='First and last name'>
              <span>Error message</span>
            </div>
            <div class='${styles.wrapperInput}'>
              <input type=text id=phone class='${
                styles.formInput
              } input' placeholder='Phone number'>
              <span>Error message</span>
            </div>
            <div class=${styles.wrapperInput}>
              <input type=text id='address' class='${
                styles.formInput
              } input' placeholder='Delivery address'>
              <span>Error message</span>
            </div>
            <div class=${styles.wrapperInput}>
              <input type=email  id=email class='${
                styles.formInput
              } input' placeholder='E-mail'>
              <span>Error message</span>
            </div>

            <div class=${styles.card}>
              <div class=${styles.wrapperInput}>
                <input type=number class=${
                  styles.cardNumberInput
                } id=cardNumber placeholder='Number card'  min="0" oninput="validity.valid||(value='')">
                <span></span>
              </div>
              <div class=${styles.cardInfo}>
                <div class=${styles.wrapperInput}>
                  <input type=number class=${
                    styles.cardInfoInput
                  } id=cardValid placeholder='Valid Thru'>
                  <span></span>
                </div>
                <div class=${styles.wrapperInput}>
                  <input type=number class=${
                    styles.cardInfoInput
                  } id=cvv placeholder='CVV'>
                  <span></span>
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
    const cardValid = document.getElementById('cardValid') as HTMLInputElement
    const cvv = document.getElementById('cvv') as HTMLInputElement

    form?.addEventListener('submit', (e) => {
      e.preventDefault()

      const cvvValue = cvv.value.trim()
      console.log(cvvValue.length)

      checkInputs()
    })

    const checkInputs = () => {
      const userNameValue = userName.value.trim()
      const phoneValue = phone.value.trim()
      const addressValue = address.value.trim()
      const emailValue = email.value.trim()
      const cvvValue = cvv.value.trim()

      const nameArray = userNameValue.split(' ')
      const nameIsString = nameArray.map((namePart) =>
        /^[a-zA-Z]+$/.test(namePart),
      )
      const nameParts = userNameValue.split(' ')
      const validNameArray = nameParts.map((namePart) => namePart.length < 3)
      const addressArray = addressValue.split(' ')
      const validAddressArray = addressArray.map(
        (adressPart) => adressPart.length < 5,
      )
      const addressIsString = addressArray.map((addressPart) =>
        /^[a-zA-Z]+$/.test(addressPart),
      )

      if (userNameValue === '') {
        setErrorFor(userName, 'User name cannot be blank')
      } else if (nameIsString.includes(false)) {
        setErrorFor(userName, 'Enter the string')
      } else if (nameParts.length < 2) {
        setErrorFor(userName, 'Required number of words - 2')
      } else if (validNameArray.includes(true)) {
        setErrorFor(userName, 'Name or surname length of at least 3 characters')
      } else {
        setSuccessFor(userName)
      }

      if (phoneValue === '') {
        setErrorFor(phone, 'Phone number cannot be blank')
      } else if (!/^\d+$/.test(phoneValue.slice(1))) {
        setErrorFor(phone, 'Expected value of a digit')
      } else if (phoneValue.slice(0, 1) !== '+') {
        setErrorFor(phone, 'Required "+" at the beginning')
      } else if (phoneValue.length < 9) {
        setErrorFor(phone, 'Minimum length 9')
      } else {
        setSuccessFor(phone)
      }

      if (addressValue === '') {
        setErrorFor(address, 'Address cannot be blank')
      } else if (addressIsString.includes(false)) {
        setErrorFor(address, 'Enter the string')
      } else if (addressArray.length < 3) {
        setErrorFor(address, 'Too short address')
      } else if (validAddressArray.includes(true)) {
        setErrorFor(address, 'Insufficient number of characters')
      } else {
        setSuccessFor(address)
      }

      if (emailValue === '') {
        setErrorFor(email, 'Email name cannot be blank')
      } else if (!isEmail(emailValue)) {
        setErrorFor(email, 'Email is not valid')
      } else {
        setSuccessFor(email)
      }

      if (cvvValue === '') {
        setErrorFor(cvv, 'CVV cannot be blank')
      } else if (!/^\d+$/.test(cvvValue)) {
        setErrorFor(cvv, 'CVV should only contain numbers')
      } else if (cvvValue.length !== 3) {
        setErrorFor(cvv, 'CVV must be 3 characters long')
      } else {
        setSuccessFor(cvv)
      }
    }

    const setErrorFor = (input: HTMLInputElement, message: string) => {
      const formControl = input.parentElement as HTMLElement
      const span = formControl?.querySelector('span') as HTMLSpanElement
      span.innerText = message
      formControl.className = `${styles.error}`
    }

    const setSuccessFor = (input: HTMLInputElement) => {
      const formControl = input.parentElement as HTMLElement
      formControl.className = `${styles.success}`
    }

    const isEmail = (emailValue: string) => {
      return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        emailValue,
      )
    }
  },
}
