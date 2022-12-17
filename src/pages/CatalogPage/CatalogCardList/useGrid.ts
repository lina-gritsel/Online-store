import styles from './CatalogCardList.module.scss'

enum OrderCards {
  SMALL = 'orderSmall',
  MANY = 'orderMany',
}

export const useGrid = () => {
  const cardsContainer = document.getElementById('cardsContainer')

  const newCards = cardsContainer?.children as any
  const arrayCards = [...newCards]

  const orderBtns = document.querySelectorAll('.order')
  orderBtns.forEach((btn: any) => {
    btn.addEventListener('click', () => {

      const searchURL = new URL((window as any).location)
      console.log(window.location)
      searchURL.searchParams.set('order', btn.id)
      window.history.pushState({}, '', searchURL)

      if (btn.id === OrderCards.MANY) {
        cardsContainer?.classList.add(`${styles.newOrder}`)
        arrayCards.forEach((card: any) => {
          card.classList.add(`${styles.newViewCard}`)
        })
      }
      if (btn.id === OrderCards.SMALL) {
        cardsContainer?.classList.remove(`${styles.newOrder}`)
        arrayCards.forEach((card: any) => {
          card.classList.remove(`${styles.newViewCard}`)
        })
      }
    })
  })
}
