import styles from './CatalogCardList.module.scss'
import { filteringBrands, filteringCategories } from './Filters'
import {deleteNotFoundMessage, addNotFoundMessage} from './constans'

type useFilter = () => void

export const useFilter: useFilter = () => {
  const filterValues = document.getElementById('filterValues')
  const filterWrapper = document.getElementById('filterWrapper')
  const filterImg = document.getElementById('filterImg') as HTMLImageElement
  const btnsFilter = [...document.querySelectorAll('.btnFilter')]

  const {
    addCategory,
    hiddenAllProducts,
    removeFromCategory,
    filterProductsByCategory,
    showAllProducts
  } = filteringCategories()

  const { addBrand, removeFromBrands, filterProductsByBrand } =
    filteringBrands()

  btnsFilter.forEach((btn) => {
    btn.addEventListener('click', (e: Event) => {
      e.stopPropagation()

      const selectedBtn = e.target as HTMLInputElement
      const filterField = selectedBtn?.id.split('-').join(' ')

      const searchURL = new URL((window as any).location)
      searchURL.searchParams.set('filterBy', filterField)
      window.history.pushState({}, '', searchURL)

      if (selectedBtn.checked) {
        selectedBtn.classList.add('checked')
        selectedBtn.classList.remove('disabled')
      } else {
        selectedBtn.classList.remove('checked')
        selectedBtn.classList.add('disabled')
      }

      if (
        selectedBtn.classList.contains('checked') &&
        selectedBtn.classList.contains('category')
      ) {
        addCategory(filterField)
      } else {
        removeFromCategory(filterField)
      }

      if (
        selectedBtn.classList.contains('checked') &&
        selectedBtn.classList.contains('brand')
      ) {
        addBrand(filterField)
      } else if (selectedBtn.classList.contains('disabled')) {
        removeFromBrands(filterField)
      }

      const filteredCategories = filterProductsByCategory()
      const filteredBrands = filterProductsByBrand()

      const result = filteredBrands.filter((item) => {
        return filteredCategories.includes(item)
      })

      hiddenAllProducts()
      deleteNotFoundMessage()

      if (btnsFilter.every((btn) => btn.classList.contains('disabled'))) {
        showAllProducts()
      }

      if (result.length) {
        result.forEach((product) => {
          product.classList.remove('hidden')
        })
      } else if (filteredBrands.length) {
        filteredBrands.forEach((product) => {
          product.classList.remove('hidden')
        })
      } else if (filteredCategories.length) {
        filteredCategories.forEach((product) => {
          product.classList.remove('hidden')
        })
      }
      if (
        filteredCategories.length &&
        filteredBrands.length &&
        !result.length
      ) {
        hiddenAllProducts()
        addNotFoundMessage()
      }
    })
  })

  filterValues?.addEventListener('click', (e: MouseEvent) => {
    filterWrapper?.classList.toggle(styles.showValues)
    filterImg.classList.toggle(styles.imgRotate)
    e.stopPropagation()
  })
}
