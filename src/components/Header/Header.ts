import styles from './Header.module.scss'

export const Header = (): string => {
  return `
        <header>
            <div class=${styles.wrapper}>
              <div class=${styles.content}>
                <h3 class=${styles.title}>Интерьер.</h3>
                <nav>
                  <ul class=${styles.nav}>
                    <a href='#catalog' class=${styles.navList}>Каталог</a>
                    <a href='' class=${styles.navList}>Корзина</a>
                  </ul>
                </nav>
                </div>
            </div>
        </header>
    `
}
