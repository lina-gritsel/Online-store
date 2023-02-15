import styles from '../CreateOrderModal.module.scss'

interface FormFieldProps {
    id: string
    type?: string
    placeholder: string
  }
  
export const FormField = {
    render: ({ id, type = 'text', placeholder }: FormFieldProps) => {
      return `
        <div class='${styles.wrapperInput}'>
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