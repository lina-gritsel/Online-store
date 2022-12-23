import styles from './Header.module.scss'

export const Header = () =>
  `
    <header>
      <div class=${styles.wrapper}>
        <div class=${styles.content}>
          <a href='#/' class=${styles.title}>Interior.</a>
          <form class=${styles.searchForm} id='searchForm' autocomplete="off" onsubmit="event.preventDefault();" role="search">
            <input class="${styles.searchInput}" id='search' type="search" placeholder="Search" autofocus required autocomplete="off"/>
          </form>
          <nav>
            <ul class=${styles.nav}>
              <a href='#/catalog' class=${styles.navList}>Catalog</a>
              <a href='#/cart' class=${styles.navList}>Сart</a>
            </ul>
          </nav>
        </div>
        <div class=${styles.line}></div>
      </div>
    </header>
`
