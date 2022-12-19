import styles from './Main.module.scss'

export const Main = (): string => {
  return `
      <div class='${styles.wrapper}'>
        <h1 class='${styles.title}'>Catalog</h1>
      </div>
    `
}
