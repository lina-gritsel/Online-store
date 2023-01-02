export const filterPrice = () => {
  const priceSlidersParent = document.getElementById(
    'filterPrice',
  ) as HTMLElement
  const rangeSliders = priceSlidersParent.querySelectorAll(
    'input[type="range"]',
  ) as NodeListOf<HTMLInputElement>
  const minPriceNumber = document.getElementById(
    'minPriceNumber',
  ) as HTMLElement
  const maxPriceNumber = document.getElementById(
    'maxPriceNumber',
  ) as HTMLElement
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
      if (resultfilteredElements?.length) return resultfilteredElements
      if (brandsElements?.length) return brandsElements
      if (categoryElements?.length) return categoryElements

      const cards = [...cardsContainer.children]
      return cards
    }

    const getFilteredProduct = getElemets()

    return getFilteredProduct
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

    minPriceNumber.innerHTML = `${valueStartSlider.toString()}$`
    maxPriceNumber.innerHTML = `${valueEndSlider.toString()}$`

    const minPrice = parseFloat(rangeSliders[0].value)
    const maxPrice = parseFloat(rangeSliders[1].value)
    localStorage.setItem('storageMinPrice', JSON.stringify(minPrice))
    localStorage.setItem('storageMaxPrice', JSON.stringify(maxPrice))
    const storagemMinPrice = JSON.parse(
      localStorage.getItem('storageMinPrice') as string,
    )
    const storagemMaxPrice = JSON.parse(
      localStorage.getItem('storageMaxPrice') as string,
    )

    const getArr = () => {
      if (storagemMinPrice && storagemMaxPrice) {
        const priceRange = Array.from(
          { length: storagemMaxPrice - storagemMinPrice + 1 },
          (_, i) => storagemMinPrice + i,
        )
        return priceRange
      } else {
        const priceRange = Array.from(
          { length: maxPrice - minPrice + 1 },
          (_, i) => minPrice + i,
        )
        return priceRange
      }
    }

    const priceRange = getArr()

    const filteredProductPrice = products.filter((product) => {
      const priceProduct = parseFloat(product.getAttribute('price') as string)

      return priceRange.includes(priceProduct)
    })

    cards.forEach((product) => {
      product.classList.add('hidden')
    })

    if (filteredProductPrice.length) {
      filteredProductPrice.forEach((product) => {
        product.classList.remove('hidden')
      })
    }
  }

  rangeSliders.forEach((slider) => {
    slider.addEventListener('change', () => {
      filter()
    })
  })
  filter()
}
