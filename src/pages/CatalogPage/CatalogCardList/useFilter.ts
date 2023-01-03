import styles from './CatalogCardList.module.scss'
import { filterBrands, filterCategories, filterPrice, filterStock } from './Filters'
import { deleteNotFoundMessage, addNotFoundMessage } from './constans'

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
    showAllProducts,
  } = filterCategories()

  const { addBrand, removeFromBrands, filterProductsByBrand } =
    filterBrands()

  const setCheckedState = () => {
    const allBrandsId =
      JSON.parse(localStorage.getItem('selectedBrands') as string) || []
    const allCategoriesId =
      JSON.parse(localStorage.getItem('selectedCategory') as string) || []
    const allSortIdFromStorage = [...allBrandsId, ...allCategoriesId]

    const allButtonsElement = document.querySelectorAll('.btnFilter')

    allButtonsElement.forEach((btn: any) => {
      const selectedBtn = btn as HTMLInputElement
      const selectedBtnId = selectedBtn.id.split('-').join(' ')

      if (allSortIdFromStorage.includes(selectedBtnId)) {
        selectedBtn.checked = true
      } else {
        selectedBtn.checked = false
      }
    })
  }

  const filterProducts = () => {
    const filteredCategories = filterProductsByCategory()
    const filteredBrands = filterProductsByBrand()
    
    setCheckedState()

    const result = filteredBrands.filter((item) => {
      return filteredCategories.includes(item)
    })

    hiddenAllProducts()
    deleteNotFoundMessage()

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
    } else {
      showAllProducts()
    }
    if (filteredCategories.length && filteredBrands.length && !result.length) {
      hiddenAllProducts()
      addNotFoundMessage()
    }
  }

  btnsFilter.forEach((btn) => {
    btn.addEventListener('click', (event: Event) => {
      const selectedBtn = event.target as HTMLInputElement
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
      } else {
        removeFromBrands(filterField)
      }

      event.stopPropagation()
      filterProducts()
    })
  })

  filterProducts()
  filterPrice()
  filterStock()

  filterValues?.addEventListener('click', (e: MouseEvent) => {
    filterWrapper?.classList.toggle(styles.showValues)
    filterImg.classList.toggle(styles.imgRotate)
    e.stopPropagation()
  })
}
