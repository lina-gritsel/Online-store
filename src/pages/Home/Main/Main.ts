import styles from './Main.module.scss'

export const Main = (): string => {
  return `
          <div class='${styles.content}'>
            <h1 class='${styles.title}'>Everything your home deserves</h1>
            <p class='${styles.subtitle}'>Our furniture — your reflection</p>
            <a href='#/catalog' class='${styles.link}'>Go to catalog</a>
          </div>
    `
}
