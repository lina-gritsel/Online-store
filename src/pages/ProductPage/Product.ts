import { Products } from '../../api/types'
import { getAllProducts, getProduct } from '../../api/requests'
import styles from './Product.module.scss'
import { parseRequestURL } from '../../utils'

export default {
  render: async () => {
    const { id } = parseRequestURL(location.hash.slice(1).toLowerCase())
    const product = await getProduct(id)
console.log(product);

    return `
    <div class=${styles.header}></div>
    <div class=${styles.container}>
        <div class=${styles.imgsWrapper}>
          <img class=${styles.img} src=${product.image}/>
          <div class=${styles.imgValue}>
            <div>picture</div>
            <div>picture</div>
            <div>picture</div>
          </div>
        </div>
        <div class=${styles.contentWrapper}>
          <div class=${styles.title}>${product.title}</div>
          <div>Brand:${product.brand}</div>
          <div>Category:${product.category}</div>
          <div class=${styles.price}>${product.price}</div>
          <div class=${styles.desc}>${product.description}</div>
          <div>Rating:${product.rating}</div>
          <div>Stock:${product.stock}</div>
        </div>
    </div>
      `
  },
  afterRender: async () => {},
}
