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
}

export const FilterSlider = {
  render: ({ className, id, value }: FilterSlidersProps) =>
    `<input 
         class='${className}'
         id=${id} 
         type="range" 
         value=${value}
         min="1"
         max="1500"  
         step="1"
    >`,
}
