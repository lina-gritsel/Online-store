import { addNotFoundMessage } from '../constans'

export const filterStock = () => {
  const stockSlidersParent = document.getElementById(
    'filterStock',
  ) as HTMLElement

  const rangeSliders = stockSlidersParent.querySelectorAll(
    'input[type="range"]',
  ) as NodeListOf<HTMLInputElement>
  const minStockValue = document.getElementById('minStockValue') as HTMLElement
  const maxStockValue = document.getElementById('maxStockValue') as HTMLElement
  const cardsContainer = document.getElementById(
    'cardsContainer',
  ) as HTMLElement
  const cards = [...cardsContainer.children]

  const btnsFilter = [...document.querySelectorAll('.btnFilter')]

  btnsFilter.forEach((btn) => {
    btn.addEventListener('click', (event: Event) => {
      filter()
      event.stopPropagation()
    })
  })

  const getAvailableProducts = () => {
    const allBrandsId =
      JSON.parse(localStorage.getItem('selectedBrands') as string) || []
    const allCategoriesId =
      JSON.parse(localStorage.getItem('selectedCategory') as string) || []
    const storageMinPrice = JSON.parse(
      localStorage.getItem('storageMinPrice') as string,
    )
    const storageMaxPrice = JSON.parse(
      localStorage.getItem('storageMaxPrice') as string,
    )

    const priceRange = Array.from(
      { length: storageMaxPrice - storageMinPrice + 1 },
      (_, i) => storageMinPrice + i,
    )

    const categoryElements = cards.filter((product) => {
      const categoryProduct = product.getAttribute('category')
      return allCategoriesId?.includes(categoryProduct)
    })

    const brandsElements = cards.filter((product) => {
      const brandProduct = product.getAttribute('brand')

      return allBrandsId?.includes(brandProduct?.toLowerCase())
    })

    const resultfilteredElements = brandsElements.filter((item) => {
      return categoryElements.includes(item)
    })

    const getElemets = () => {
      if (
        allCategoriesId.length &&
        allBrandsId.length &&
        !resultfilteredElements.length
      ) {
        return []
      }
      if (resultfilteredElements?.length) return resultfilteredElements
      if (brandsElements?.length) return brandsElements
      if (categoryElements?.length) return categoryElements

      return [...cardsContainer.children]
    }

    const getFilteredProduct = getElemets()

    const filteredProductPrice = getFilteredProduct.filter((product) => {
      const priceProduct = parseFloat(product.getAttribute('price') as string)

      return priceRange?.includes(priceProduct)
    })

    if (filteredProductPrice) {
      return filteredProductPrice
    } else {
      return getFilteredProduct
    }
  }

  const filter = () => {
    const products = getAvailableProducts()

    let valueStartSlider = parseFloat(rangeSliders[0].value)
    let valueEndSlider = parseFloat(rangeSliders[1].value)

    if (valueStartSlider > valueEndSlider) {
      ;[valueStartSlider, valueEndSlider] = [valueEndSlider, valueStartSlider]
    }

    rangeSliders[0].value = valueStartSlider.toString()
    rangeSliders[1].value = valueEndSlider.toString()

    minStockValue.innerHTML = `${valueStartSlider.toString()}`
    maxStockValue.innerHTML = `${valueEndSlider.toString()}`

    const minStock = parseFloat(rangeSliders[0].value)
    const maxStock = parseFloat(rangeSliders[1].value)
    localStorage.setItem('minStock', JSON.stringify(minStock))
    localStorage.setItem('maxStock', JSON.stringify(maxStock))

    const stockRange = Array.from(
      { length: maxStock - minStock + 1 },
      (_, i) => minStock + i,
    )

    const filteredProductStock = products.filter((product) => {
      const stockProduct = parseFloat(product.getAttribute('stock') as string)

      return stockRange.includes(stockProduct)
    })

    cards.forEach((product) => {
      product.classList.add('hidden')
    })

    if (filteredProductStock.length) {
      filteredProductStock.forEach((product) => {
        product.classList.remove('hidden')
      })
    }else {
      addNotFoundMessage()
    }
  }

  rangeSliders.forEach((slider) => {
    slider.addEventListener('change', () => {
      filter()
    })
  })
  filter()
}
