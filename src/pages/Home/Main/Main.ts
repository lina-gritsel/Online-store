import styles from './Main.module.scss'

export const Main = (): string => {
  return `
          <div class='${styles.content}'>
            <h1 class='${styles.title}'>Всё, чего заслуживает ваш дом</h1>
            <p class='${styles.subtitle}'>Наша мебель — ваше отражение</p>
            <a href='#/catalog' class='${styles.link}'>Перейти в каталог</a>
          </div>
    `
}
