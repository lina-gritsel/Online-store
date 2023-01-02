import styles from './CatalogCardList.module.scss'

enum OrderCards {
  SMALL = 'smallGrid',
  MANY = 'langeGrid',
}

export const useGrid = () => {
  const cardsContainer = document.getElementById(
    'cardsContainer',
  ) as HTMLElement
  const orderBtns = document.querySelectorAll('.order')

  const cards = [...cardsContainer?.children]

  const setLargeGrid = () => {
    cardsContainer?.classList.add(`${styles.newOrder}`)
    cards.forEach((card: any) => {
      card.classList.add(`${styles.newViewCard}`)
    })
  }

  const setSmallGrid = () => {
    cardsContainer?.classList.remove(`${styles.newOrder}`)
    cards.forEach((card: any) => {
      card.classList.remove(`${styles.newViewCard}`)
    })
  }

  orderBtns.forEach((btn: any) => {
    const elementId = btn.id
    btn.addEventListener('click', () => {
      
      const searchURL = new URL((window as any).location)
      searchURL.searchParams.set('order', elementId)
      window.history.pushState({}, '', searchURL)

      if (btn.id === OrderCards.MANY) {
        cardsContainer?.classList.add(`${styles.newOrder}`)
        setLargeGrid()
      }
      if (btn.id === OrderCards.SMALL) {
        cardsContainer?.classList.remove(`${styles.newOrder}`)
        setSmallGrid()
      }
    })
  })
}
