import styles from './CatalogCardList.module.scss'

type UseSearch = () => void

export const useSearch: UseSearch = () => {
  const cardsContainer = document.getElementById(
    'cardsContainer',
  ) as HTMLDivElement
  const inputEl = document.getElementById('search') as HTMLInputElement
  const notFound = document.getElementById('notFound') as HTMLParagraphElement
  const btnsSort = document.querySelectorAll('.btnSort')
  let cards = [...cardsContainer.children]

  const search = () => {
    cards = [...cardsContainer.children]
    const inputValue = inputEl.value.toUpperCase().trim()

    if (inputValue !== '') {
      cards.forEach((card: Element, index: number) => {
        const productName = card.children[1].textContent
        const productPrice = card.children[3].textContent

        const allValues =
          productName?.toUpperCase().includes(inputValue) ||
          productPrice?.toUpperCase().includes(inputValue)

        if (!allValues) {
          cards[index].classList.add(styles.hidden)

          if (cards.every((card) => card.classList.contains(styles.hidden))) {
            notFound.style.display = 'block'
          }
        } else {
          cards[index].classList.remove('hidden')
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

  btnsSort.forEach((btn) => btn.addEventListener('click', () => {
    search()
  }))

  inputEl.addEventListener('search', () => {
    if (inputEl.value === '') {
      cards.forEach((card: Element) => {
        card.classList.remove(styles.hidden)
        notFound.style.display = 'none'
      })
    }
  })
}
