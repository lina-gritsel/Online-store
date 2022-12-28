import { addToCart } from '../CatalogPage/CatalogCardList/addToCart'
import categoryStyles from './Category/Category.module.scss'
import { CardList } from '../../components/CardList'
import mainStyles from './Main/Main.module.scss'
import { getAllProducts } from '../../api'
import { Category } from './Category'
import { Main } from './Main'

export default {
  render: async () => {
    return `
    <section class=${mainStyles.main}>${Main()}</section>
    <div class=container>
      <section class=${categoryStyles.category}>${Category()}</section>
      <div>${await CardList.render()}</div>
    </div>
    `
  },
  afterRender: async () => {
    const products = await getAllProducts()

    products.forEach((product) => product.isInCart = false)

    addToCart({ products })
  },
}
