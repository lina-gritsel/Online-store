import styles from '../CatalogCardList.module.scss'
import { SORT_VALUES } from './constants'

export const SortValues = {
  render: () =>
    `${SORT_VALUES.map(
      ({ label, value }) =>
        `<button
            class='${styles.sortBtn} btnSort'
            id=${value}
            >
            ${label}
          </button>`,
    ).join('')}
      `,
}

interface FilterValuesProps {
  sortValues: { label: string; value: string }[]
  className?: string
}

export const FilterValues = {
  render: ({ sortValues, className }: FilterValuesProps) =>
    `${sortValues
      .map(
        ({ label, value }) =>
          `<label class='${styles.categoryName}'>
            <input
              class='${styles.categoryCheckbox} btnFilter disabled ${className}'
              id=${value}
              type=checkbox
            >
            ${label}
          </label>`,
      )
      .join('')}
      `,
}

interface FilterSlidersProps {
  className?: string
  id: string
  value: string
  max: string
}

export const FilterSlider = {
  render: ({ className, id, value, max }: FilterSlidersProps) =>
    `<input 
         class='${className}'
         id=${id} 
         type="range" 
         value=${value}
         min="0"
         max=${max}
         step="1"
    >`,
}
