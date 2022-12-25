import styles from '../CreateOrderModal.module.scss'

interface FormFieldProps {
  id: string
  type?: string
  placeholder?: string
}

export const FormFields = {
  render: ({ id, type = 'text', placeholder }: FormFieldProps) => {
    return `
        <div class=${styles.wrapperInput}>
          <input
            type=${type}
            id=${id}
            class='${styles.formInput} input'
            placeholder=${placeholder}
          >
          <span>Error message</span>
        </div>
      `
  },
}

interface MonthInputProps {
  id: string
  placeholder: string
  maxlength?: string
}

export const MonthInput = {
  render: ({ id, placeholder, maxlength = '' }: MonthInputProps) => {
    return `
        <input
          autocomplete="off"
          class=${styles.exp}
          id=${id}
          pattern="[0-9]*"
          placeholder=${placeholder}
          type="text"
          maxlength="${maxlength}"
          inputmode="numerical" 
          data-pattern-validate
        />
      `
  },
}
