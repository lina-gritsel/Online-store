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
              <div class=${styles.cartBlock}>
                <a href='#/cart' class=${styles.navList}>Сart</a>
                <div class=${styles.cartLength}>
                  <img class=${styles.headerCart} src='../../assets/svg/headerCart.svg'/>
                  <p class=${styles.text} id='cartLength'></p>
                </div>
              </div>
            </ul>
          </nav>
        </div>
        <div class=${styles.line}></div>
      </div>
    </header>
`
