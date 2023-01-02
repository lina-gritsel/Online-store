import styles from './CatalogCardList.module.scss'

type UseSearch = () => void

export const useSearch: UseSearch = () => {
  const cardsContainer = document.getElementById(
    'cardsContainer',
  ) as HTMLDivElement
  const inputEl = document.getElementById('search') as HTMLInputElement
  const notFound = document.getElementById('notFoundProducts') as HTMLElement
  const btnsSort = document.querySelectorAll('.btnSort')
  const cards = [...cardsContainer.children]

  const search = () => {
    const inputValue = inputEl.value.toUpperCase().trim()

    if (inputValue !== '') {
      cards.forEach((card: Element, index: number) => {
        const productName = card.getAttribute('name')
        const productPrice = card.getAttribute('price')
        const productStock = card.getAttribute('stock')
        const productBrand = card.getAttribute('brand')
        const productRating = card.getAttribute('rating')
        const productCategory = card.getAttribute('category')
        const productDescription = card.getAttribute('description')

        const allValues =
          productName?.toUpperCase().includes(inputValue) ||
          productPrice?.toUpperCase().includes(inputValue) ||
          productStock?.toUpperCase().includes(inputValue) ||
          productBrand?.toUpperCase().includes(inputValue) ||
          productRating?.toUpperCase().includes(inputValue) ||
          productCategory?.toUpperCase().includes(inputValue) ||
          productDescription?.toUpperCase().includes(inputValue)

        if (!allValues) {
          cards[index].classList.add(styles.hidden)

          if (cards.every((card) => card.classList.contains(styles.hidden))) {
            notFound.style.display = 'block'
          }
        } else {
          cards[index].classList.remove(styles.hidden)
          notFound.style.display = 'none'
        }
      })
    } else {
      cards.forEach((card: Element) => {
        card.classList.remove(styles.hidden)
        notFound.style.display = 'none'
      })
    }
  }

  inputEl.addEventListener('keyup', () => {
    search()
  })

  btnsSort.forEach((btn) =>
    btn.addEventListener('click', () => {
      search()
    }),
  )

  inputEl.addEventListener('search', () => {
    if (inputEl.value === '') {
      cards.forEach((card: Element) => {
        card.classList.remove(styles.hidden)
        notFound.style.display = 'none'
      })
    }
  })
}
