import { Layout } from '../components/Layout'
import Home from '../pages/Home'
import CatalogPage from '../pages/CatalogPage'

const pages = {
  home: Home,
  catalog: CatalogPage,
}

const getCurrentPage = (route: string) => {
  switch (route) {
    case '#': {
      return pages.home
    }
    case '#catalog': {
      return pages.catalog
    }
    default: {
      return pages.home
    }
  }
}

export const router = async (route: string) => {
  const app = document.querySelector('#app') as HTMLElement
  app.innerHTML = ''

  const currentPage = getCurrentPage(route)

  return (app.innerHTML = await Layout(currentPage))
}
