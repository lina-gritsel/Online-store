import styles from './Footer.module.scss'
import Logo from '../../assets/svg/rs-school.svg'

export const Footer = (): string => {
  return `
      <footer class=${styles.footer}>
        <div class=${styles.wrapper}>
          <div class=${styles.content}>Интерьер.</div>
          <div class=${styles.menu}>Меню
            <a href='#' class=${styles.menu__item}>Главная</a>
            <a href='#catalog' class=${styles.menu__item}>Каталог</a>
            <a href='' class=${styles.menu__item}>Корзина</a>
          </div>
          <div class=${styles.contacts}>Контакты
            <a href="https://github.com/lina-gritsel">
              <span class="${styles.github__link}">Lina</span>
            </a>
            <a href="https://github.com/Pashashchuka">
              <span class="${styles.github__link}">Pasha</span>
            </a>
          </div>
          <div class=${styles.second__logo}>
            <a href="https://rs.school/js/">
              <img src=${Logo} alt="logo" />
            </a>
          </div>
        </div>
      </footer>
    `
}
