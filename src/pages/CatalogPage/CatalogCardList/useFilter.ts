import styles from './CatalogCardList.module.scss'

type useFilter = () => void

enum FilterCategory {
  RELAX = 'relax',
  JOB = 'job',
  KITCHEN = 'kitchen',
  KIDS = 'kids',
  BATHROOM = 'bathroom',
}

enum FilterBrand {
  ADLER = 'adler',
  MODERN = 'modern',
  BURKE = 'burke',
  BENCH = 'bench',
  CASTLERY = 'castlery',
}

export const useFilter: useFilter = () => {
  const filterValues = document.getElementById('filterValues')
  const filterWrapper = document.getElementById('filterWrapper')
  const filterImg = document.getElementById('filterImg') as HTMLImageElement
  const btnsFilter = [...document.querySelectorAll('.btnFilter')]
  const notFound = document.getElementById('notFound') as HTMLParagraphElement
  const cardsContainer = document.getElementById(
    'cardsContainer',
  ) as HTMLDivElement
  let products = [...cardsContainer.children]

  const filterProducts = (filterField: string, products: Element[]) => {
    const filterBy = filterField

    const searchURL = new URL((window as any).location)
    searchURL.searchParams.set('filterBy', filterBy)
    window.history.pushState({}, '', searchURL)

    return products.filter((product): any => {
      if (filterBy === FilterCategory.RELAX) {
        return product.children[4].textContent === 'relax'
      }
      if (filterBy === FilterCategory.JOB) {
        return product.children[4].textContent === 'job'
      }
      if (filterBy === FilterCategory.KITCHEN) {
        return product.children[4].textContent === 'kitchen'
      }
      if (filterBy === FilterCategory.KIDS) {
        return product.children[4].textContent === 'kids'
      }
      if (filterBy === FilterCategory.BATHROOM) {
        return product.children[4].textContent === 'bathroom'
      }
      if (filterBy === FilterBrand.ADLER) {
        return product.children[5].textContent === 'Jonathan Adler'
      }
      if (filterBy === FilterBrand.MODERN) {
        return product.children[5].textContent === 'AllModern'
      }
      if (filterBy === FilterBrand.BURKE) {
        return product.children[5].textContent === 'Burke Decor'
      }
      if (filterBy === FilterBrand.BENCH) {
        return product.children[5].textContent === 'Benchmade Modern'
      }
      if (filterBy === FilterBrand.CASTLERY) {
        return product.children[5].textContent === 'Castlery'
      }
    })
  }

  const filter = (btn: any) => {
    btn.addEventListener('click', (e: MouseEvent) => {
      products = [...cardsContainer.children]
      
      const selectedBtn = (e as any)?.target

      if (selectedBtn.checked) {
        selectedBtn.classList.add('checked')
        selectedBtn.classList.remove('disabled')
      } else {
        selectedBtn.classList.remove('checked')
        selectedBtn.classList.add('disabled')
      }

      const filterField = (e as any)?.target.id
      const filterArray = filterProducts(filterField, products)

      products.forEach((product) => {
        product.classList.add(styles.hidden)
      })

      filterArray.forEach((product) => {
        product.classList.remove(styles.hidden)
      })

      if (btnsFilter.every((btn) => btn.classList.contains('disabled'))) {
        products.forEach((product) => {
          product.classList.remove(styles.hidden)
        })
      }
    })
  }

  btnsFilter.forEach((btn) => {
    filter(btn)
  })

  filterValues?.addEventListener('click', (e: MouseEvent) => {
    filterWrapper?.classList.toggle(styles.showValues)
    filterImg.classList.toggle(styles.imgRotate)
    e.stopPropagation()
  })
}
