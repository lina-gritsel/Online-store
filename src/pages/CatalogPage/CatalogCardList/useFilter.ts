import styles from './CatalogCardList.module.scss'

type useFilter = () => void

export const useFilter: useFilter = () => {
  const body = document.querySelector('body')
  const filterValues = document.getElementById('filterValues')
  const filterWrapper = document.getElementById('filterWrapper')
  const filterImg = document.getElementById('filterImg') as HTMLImageElement
  const btnsFilter = [...document.querySelectorAll('.btnFilter')]
  const cardsContainer = document.getElementById(
    'cardsContainer',
  ) as HTMLDivElement
  const priceSlidersParent = document.getElementById(
    'filterPrice',
  ) as HTMLElement

  const products = [...cardsContainer.children]
  let selectedCategory: string[] = []
  let selectedBrands: string[] = []

  btnsFilter.forEach((btn) => {
    btn.addEventListener('click', (e: Event) => {
      e.stopPropagation()

      const selectedBtn = e.target as HTMLInputElement
      const filterField = selectedBtn?.id

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
        selectedCategory.push(filterField)
      } else if (selectedBtn.classList.contains('disabled')) {
        selectedCategory = selectedCategory.filter((category) => {
          return category !== filterField
        })
      }

      if (
        selectedBtn.classList.contains('checked') &&
        selectedBtn.classList.contains('brand')
      ) {
        selectedBrands.push(filterField)
      } else if (selectedBtn.classList.contains('disabled')) {
        selectedBrands = selectedBrands.filter((brand) => {
          return brand !== filterField
        })
      }

      const filteredProductCategory = products.filter((product: Element) => {
        const currentCategory = product.getAttribute('category') as string

        return selectedCategory.includes(currentCategory)
      })

      const filteredProductBrand = products.filter((product) => {
        const currentBrand = product
          .getAttribute('brand')
          ?.toLowerCase() as string

        return selectedBrands.includes(currentBrand)
      })

      const result = filteredProductBrand.filter((item) => {
        return filteredProductCategory.includes(item)
      })

      products.forEach((product) => {
        product.classList.add('hidden')
      })

      if (result.length) {
        result.forEach((product) => {
          product.classList.remove('hidden')
        })
      } else if (filteredProductBrand.length) {
        filteredProductBrand.forEach((product) => {
          product.classList.remove('hidden')
        })
      } else if (filteredProductCategory.length) {
        filteredProductCategory.forEach((product) => {
          product.classList.remove('hidden')
        })
      } else if (
        filteredProductCategory &&
        filteredProductBrand.length &&
        !result.length
      ) {
        products.forEach((product) => {
          product.classList.add('hidden')
        })
        cardsContainer.innerHTML = 'Nothing found for your request'
      }

      if (btnsFilter.every((btn) => btn.classList.contains('disabled'))) {
        products.forEach((product) => {
          product.classList.remove('hidden')
        })
      }
    })
  })

  filterValues?.addEventListener('click', (e: MouseEvent) => {
    filterWrapper?.classList.toggle(styles.showValues)
    filterImg.classList.toggle(styles.imgRotate)
    e.stopPropagation()
  })

  const rangeSliders = priceSlidersParent.querySelectorAll(
    'input[type="range"]',
  ) as NodeListOf<HTMLInputElement>
  const numberSliders = priceSlidersParent.querySelectorAll(
    'input[type="number"]',
  ) as NodeListOf<HTMLInputElement>
  let minPriceSlider = rangeSliders[0].value
  let maxPriceSlider = rangeSliders[1].value
  let minPriceNumber = numberSliders[0].value
  let maxPriceNumber = numberSliders[1].value



  rangeSliders.forEach((slider) => {
    slider.addEventListener('change', () => {
      // rangeSliders.forEach((slider) => {
      //   slider.oninput = () => {
      let slider1 = parseFloat(rangeSliders[0].value)
      let slider2 = parseFloat(rangeSliders[1].value)

      if (slider1 > slider2) {
        [slider1, slider2] = [slider2, slider1]
      }

      numberSliders[0].value  = slider1.toString()
      numberSliders[1].value = slider2.toString()

      rangeSliders[0].value = slider1.toString()
      rangeSliders[1].value = slider2.toString()
      //   }
      // })

      numberSliders.forEach((price) => {
        price.oninput = () => {
          let price1 = parseFloat(numberSliders[0].value )
          let price2 = parseFloat(numberSliders[1].value)

          if (price1 > price2) {
            numberSliders[0].value  = price2.toString()
            numberSliders[1].value = price1.toString()
          }

          rangeSliders[0].value = price1.toString()
          rangeSliders[1].value = price2.toString()
        }
      })

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

      products.forEach((product) => {
        product.classList.add('hidden')
      })

      if (filteredProductPrice.length) {
        filteredProductPrice.forEach((product) => {
          product.classList.remove('hidden')
        })
      }
    })

    // body?.addEventListener('click', () => {
    //   if (
    //     filterWrapper?.classList.contains(styles.showValues) &&
    //     filterImg?.classList.contains(styles.imgRotate)
    //   ) {
    //     filterWrapper.classList.remove(styles.showValues)
    //     filterImg.classList.remove(styles.imgRotate)
    //   }
    // })
  })
}
