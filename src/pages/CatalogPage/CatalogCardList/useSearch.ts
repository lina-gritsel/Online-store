import styles from './CatalogCardList.module.scss'

type UseSearch = () => void

export const useSearch: UseSearch = () => {
  const inputEl = document.getElementById('search') as HTMLInputElement
  const notFound = document.getElementById('notFound') as HTMLParagraphElement
  const loadMore = document.getElementById('loadMore') as HTMLParagraphElement
  const cards = [...document.querySelectorAll('#card')]

  inputEl.addEventListener('keyup', () => {
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
          loadMore.style.display = 'none'

          if (cards.every((card) => card.classList.contains(styles.hidden))) {
            notFound.style.display = 'block'
          }
        } else {
          cards[index].classList.remove(styles.hidden)
          notFound.style.display = 'none'
          loadMore.style.display = 'block'
        }
      })
    } else {
      cards.forEach((card: Element) => {
        card.classList.remove(styles.hidden)
        notFound.style.display = 'none'
        loadMore.style.display = 'block'
      })
    }
  })
}
