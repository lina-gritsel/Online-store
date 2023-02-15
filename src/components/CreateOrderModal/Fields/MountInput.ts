import styles from '../CreateOrderModal.module.scss'

interface MonthInputProps {
    id: string
    placeholder: string
    maxlength?: string
  }
  
 export const MonthInput = {
    render: ({ id, placeholder, maxlength = '' }: MonthInputProps) => {
      return `
        <div class=${styles.monthWrapper}>
        <input
          autocomplete="off"
          class=${styles.exp}
          id=${id}
          pattern="[0-9]*"
          placeholder=${placeholder}
          type="text"
          data-pattern-validate
          maxlength=${maxlength}
          inputmode="numerical" 
        />
        </div>
      `
    },
  }

