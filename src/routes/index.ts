// import { Layout } from '../components/Layout'
// import Home from '../pages/Home'
// import CatalogPage from '../pages/CatalogPage'

// const pages = {
//   home: Home,
//   catalog: CatalogPage,
// }

// const getCurrentPage = (route: string) => {
//   switch (route) {
//     case '#': {
//       return pages.home
//     }
//     case '#catalog': {
//       return pages.catalog
//     }
//     default: {
//       return pages.home
//     }
//   }
// }

// export const router = async (route: string) => {
//   const app = document.querySelector('#app') as HTMLElement
//   app.innerHTML = ''

//   const currentPage = getCurrentPage(route) as any

//   app.innerHTML = await Layout(await currentPage.render)
//   await currentPage.afterRender()

//   const isHiddenHeader = currentPage !== pages.catalog
//   if (isHiddenHeader) {
//     const search = document.getElementById('searchForm') as HTMLFormElement;

//     search.style.display = 'none';
//   }
// }


import { parseRequestURL } from './../utils/index'
import ErrorPage from '../pages/ErrorPage'
import { Layout } from '../components/Layout'
import { Routres } from './routes'

const renderPage = async (url: string, routes: Routres): Promise<void> => {
  const app = document.getElementById('app') as HTMLElement

  const { resource, id } = parseRequestURL(url)

  const page = routes[`/${resource}${id ? '/:id' : ''}`] || ErrorPage

  const isHiddenHeader = page !== routes['/catalog']

  app.innerHTML = await Layout(await page.render)
  page.afterRender()

  if (isHiddenHeader) {
    const search = document.getElementById('searchForm') as HTMLFormElement
    search.style.display = 'none'
  }
}

const router = (routes: Routres): void => {
  window.addEventListener('hashchange', async () => {
    await renderPage(location.hash.slice(1).toLowerCase(), routes)
  })

  window.addEventListener('load', async () => {
    await renderPage(location.hash.slice(1).toLowerCase(), routes)
  })
}

export default router
