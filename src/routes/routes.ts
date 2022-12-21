import Home from '../pages/Home'
import CatalogPage from '../pages/CatalogPage'
import Product from '../pages/ProductPage'
import Cart from '../pages/CartPage/Cart'

export interface Component {
  render: () => Promise<string>
  afterRender: () => Promise<void>
}

export type Routres = Record<string, Component>

const ROUTES: Routres = {
  '/': Home,
  '/catalog': CatalogPage,
  '/products/:id': Product,
  '/cart': Cart,
}

export default ROUTES