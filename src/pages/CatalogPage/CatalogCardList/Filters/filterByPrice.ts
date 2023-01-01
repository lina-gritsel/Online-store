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

    const categoryElements = [...cardsContainer.children].filter((product) => {
      const categoryProduct = product.getAttribute('category')
      return allCategoriesId?.includes(categoryProduct)
    })

    const brandsElements = [...cardsContainer.children].filter((product) => {
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
      return [...cardsContainer.children]
    }

    const getFilteredProduct = getElemets()

    return getFilteredProduct
  }

  const filter = () => {
    const products = getAvailableProducts()

    let slider1 = parseFloat(rangeSliders[0].value)
    let slider2 = parseFloat(rangeSliders[1].value)

    if (slider1 > slider2) {
      ;[slider1, slider2] = [slider2, slider1]
    }

    rangeSliders[0].value = slider1.toString()
    rangeSliders[1].value = slider2.toString()

    minPriceNumber.innerHTML = `${slider1.toString()}$`
    maxPriceNumber.innerHTML = `${slider2.toString()}$`

    const minPrice = parseFloat(rangeSliders[0].value)
    const maxPrice = parseFloat(rangeSliders[1].value)
    const priceRange = Array.from(
      { length: maxPrice - minPrice + 1 },
      (_, i) => minPrice + i,
    )

    const filteredProductPrice = products.filter((product) => {
      const priceProduct = parseFloat(product.getAttribute('price') as string)

      return priceRange.includes(priceProduct)
    })

    ;[...cardsContainer.children].forEach((product) => {
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
}
