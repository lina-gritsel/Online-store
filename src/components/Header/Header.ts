import styles from './Header.module.scss'

export const Header = () => {
    return `
    <header>
      <div class=${styles.wrapper}>
        <div class=${styles.content}>
          <a href='#/' class=${styles.title}>Интерьер.</a>
          <form class=${styles.searchForm} id='searchForm' autocomplete="off" onsubmit="event.preventDefault();" role="search">
            <input class="${styles.searchInput}" id='search' type="search" placeholder="Поиск" autofocus required autocomplete="off"/>
          </form>
          <nav>
            <ul class=${styles.nav}>
              <a href='#/catalog' class=${styles.navList}>Каталог</a>
              <a href='' class=${styles.navList}>Корзина</a>
            </ul>
          </nav>
        </div>
        <div class=${styles.line}></div>
      </div>
    </header>
`
}
