import { Products } from './../../api/types'
import { getAllProducts, getProduct } from './../../api/requests'
import styles from './Product.module.scss'

export default {
  render: async () => {
    const products = await getAllProducts()
    const newData: any = products.splice(0, 1)
    console.log(newData)

    return `
    <div class=${styles.header}></div>
    <div class=${styles.container}>
      ${newData.map((product: any) => `
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
          <div>Brand</div>
          <div>Category</div>
          <div class=${styles.price}>${product.price}</div>
          <div class=${styles.desc}>${product.description}</div>
          <div>Rating:</div>
          <div>Stock:</div>


        </div>
          
          `)
        .join('')}
        
    </div>
      `
  },
  afterRender: async () => {},
}
