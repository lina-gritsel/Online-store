import styles from './CatalogCardList.module.scss'

export const addNotFoundMessage = () => {
  const notFoundProducts = document.getElementById(
    'notFound',
  ) as HTMLElement

  notFoundProducts.classList.add(`${styles.showNotFoundProducts}`)
  notFoundProducts.innerHTML = 'Nothing found for your request'
}

export const deleteNotFoundMessage = () => {
  const notFoundProducts = document.getElementById(
    'notFound',
  ) as HTMLElement

  notFoundProducts.classList.remove(`${styles.showNotFoundProducts}`)
}
