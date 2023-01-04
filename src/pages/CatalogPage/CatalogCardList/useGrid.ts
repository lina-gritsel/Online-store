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

  const gridResize = (gridSize: string) => {
    const searchURL = new URL((window as any).location)
    searchURL.searchParams.set('order', gridSize)
    window.history.pushState({}, '', searchURL)

    if (gridSize === OrderCards.MANY) {
      setLargeGrid()
    }
    if (gridSize === OrderCards.SMALL) {
      setSmallGrid()
    }
  }

  orderBtns.forEach((btn: any) => {
    btn.addEventListener('click', () => {
      localStorage.setItem('grid', btn.id)

      const btnId = localStorage.getItem('grid') || btn.id
      gridResize(btnId)
    })
  })

  const storageGridSize = localStorage.getItem('grid') || OrderCards.SMALL
  gridResize(storageGridSize)
}
