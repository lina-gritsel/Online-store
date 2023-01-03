import { getAllProducts } from '../../../api'
import { Card } from '../../../components/Card'

export const resetFilters = () => {
  const resetBtn = document.getElementById('resetBtn') as HTMLButtonElement
  const globalSortBtn = document.getElementById('globalSortBtn') as HTMLElement
  const allButtonsElement = document.querySelectorAll('.btnFilter')
  const minPrice = document.getElementById('startPrice') as HTMLInputElement
  const maxPrice = document.getElementById('endPrice') as HTMLInputElement
  const minStock = document.getElementById('minStock') as HTMLInputElement
  const maxStock = document.getElementById('maxStock') as HTMLInputElement
  const minStockValue = document.getElementById('minStockValue') as HTMLElement
  const maxStockValue = document.getElementById('maxStockValue') as HTMLElement
  const inputEl = document.getElementById('search') as HTMLInputElement

  const minPriceNumber = document.getElementById(
    'minPriceNumber',
  ) as HTMLElement
  const maxPriceNumber = document.getElementById(
    'maxPriceNumber',
  ) as HTMLElement

  const cards = document.getElementById('cardsContainer') as HTMLElement

  resetBtn.addEventListener('click', async () => {
    const cardElement = [...cards.children]

    cardElement.forEach((product) => {
      product.classList.remove('hidden')
    })

    inputEl.value = ''

    minPrice.value = '0'
    maxPrice.value = '1500'
    minStock.value = '0'
    maxStock.value = '100'

    minPriceNumber.innerHTML = '0$'
    maxPriceNumber.innerHTML = '1500$'
    minStockValue.innerHTML = `0`
    maxStockValue.innerHTML = `100`

    allButtonsElement.forEach((btn: any) => {
      const selectedBtn = btn as HTMLInputElement

      selectedBtn.checked = false
    })

    globalSortBtn.innerHTML = ''
    globalSortBtn.innerHTML = 'Order options'

    window.localStorage.removeItem('selectedCategory')
    window.localStorage.removeItem('selectedBrands')
    window.localStorage.removeItem('storageMinPrice')
    window.localStorage.removeItem('storageMaxPrice')
    window.localStorage.removeItem('minStock')
    window.localStorage.removeItem('maxStock')
    window.localStorage.removeItem('searchValue')
    window.localStorage.removeItem('grid')
    window.localStorage.removeItem('sortBy')
    window.localStorage.removeItem('sortOrder')
  })
}
