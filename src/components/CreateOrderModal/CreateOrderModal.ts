import styles from './CreateOrderModal.module.scss'
import { MonthInput } from './Fields/MountInput'
import { useOrderModal } from './useOrderModal'
import { FormField } from './Fields/Fields'
import {
  onCodeHandler,
  onlyNumberVoid,
  onCardNumberHandler,
} from './modules/validation'

export default {
  render: async () => {
    return `
        <div class=${styles.formWrapper} id=formWrapper>
          <form class=${styles.form} id='form'>
            <div class=${styles.formHeader}>Ordering</div> 
            ${FormField.render({
              id: 'userName',
              type: 'text',
              placeholder: 'First and last name',
            })}
            ${FormField.render({
              id: 'phone',
              type: 'text',
              placeholder: 'Phone number',
            })}
            ${FormField.render({
              id: 'address',
              type: 'text',
              placeholder: 'Delivery address',
            })}
            ${FormField.render({
              id: 'email',
              type: 'email',
              placeholder: 'E-mail',
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
                  placeholder='**** **** **** ****'>
                <span></span>
              </div>
              <div class=${styles.cardInfo}>
                <div class=${styles.expWrapper}>
                  ${MonthInput.render({
                    id: 'month',
                    placeholder: 'MM',
                  })}
                  ${MonthInput.render({
                    id: 'year',
                    placeholder: 'YY',
                    maxlength: '2',
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
                  <span></span>
                </div>
              </div>
            </div>
            <div class=${styles.total} id='totalPrice'></div>
            <button class=${styles.formBtn} id='confirm'>CONFIRM</button>
          </form>
        </div>
        <div class=${styles.popupWrapper} id='popupWrapper'>
          <p class=${styles.text}>Your order has been placed. Thank you for your purchase!</p>
        </div>
        <div class=${styles.blackout} id='blackout'></div>
        <div class=${styles.hidden} id='hidden'></div>
    `
  },

  afterRender: async () => {
    useOrderModal()
  },
}
