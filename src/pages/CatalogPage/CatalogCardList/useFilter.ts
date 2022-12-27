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

      const isChecked = selectedBtn.classList.contains('checked')
      const isCheckedCategory = selectedBtn.classList.contains('category')
      const isCheckedBrand = selectedBtn.classList.contains('brand')

      if (isChecked && isCheckedCategory) {
        selectedCategory.push(filterField)
      } else {
        selectedCategory = selectedCategory.filter((category) => {
          return category !== filterField
        })
      }

      if (isChecked && isCheckedBrand) {
        selectedBrands.push(filterField)
      } else {
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

      const result = filteredProductCategory.filter((product) => {
        return filteredProductBrand.includes(product)
      })

      showAllProducts(products)

      if (result.length) {
        hiddenProducts(result)
      } else if (filteredProductBrand.length) {
        hiddenProducts(filteredProductBrand)
      } else if (filteredProductCategory.length) {
        hiddenProducts(filteredProductCategory)
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

  body?.addEventListener('click', () => {
    if (
      filterWrapper?.classList.contains(styles.showValues) &&
      filterImg?.classList.contains(styles.imgRotate)
    ) {
      filterWrapper.classList.remove(styles.showValues)
      filterImg.classList.remove(styles.imgRotate)
    }
  })
}

const hiddenProducts = (products: Element[]): void => {
  products.forEach((product) => {
    product.classList.remove('hidden')
  })
}

const showAllProducts = (products: Element[]) => {
  products.forEach((product) => {
    product.classList.add('hidden')
  })
}
