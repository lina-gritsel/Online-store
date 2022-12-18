import { getProduct } from '../../api/requests'
import styles from './Product.module.scss'
import { parseRequestURL } from '../../utils'
import arrow from '../../assets/svg/arrow.svg'

export default {
  render: async () => {
    const { id } = parseRequestURL(location.hash.slice(1).toLowerCase())
    const product = await getProduct(id)
    const arrImages = product.image

    return `
    <div class=${styles.header}></div>
    <div class=${styles.wrapperPath}>
      <a href='' class=${styles.path}>Store</a>
      <img class=${styles.arrow} src=${arrow}/>
      <div class=${styles.path}>${product.category}</div>
      <img class=${styles.arrow} src=${arrow}/>
      <div class=${styles.path}>${product.brand}</div>
      <img class=${styles.arrow} src=${arrow}/>
      <div class=${styles.path}>${product.title}</div>
    </div>
    <div class=${styles.container}>
        <div class=${styles.imgsWrapper}>
          <img class='${styles.img}' id='mainImg' src=${product.image[0]}/>
          <div class='${styles.imgsValue}' id='imgsValue'>
            ${arrImages.map((image) : string => 
              `<img class='${styles.secondImg} secondImg' src=${image}/>`).join('')
            }
          </div>
        </div>
        <div class=${styles.contentWrapper}>
          <div class=${styles.title}>${product.title}</div>
          <div class=${styles.price}>${product.price}$</div>
          <div><span>Brand:</span> ${product.brand}</div>
          <div><span>Rating:</span> ${product.rating}</div>
          <div><span>Stock:</span> ${product.stock}</div>
          <div><span>Category:</span> ${product.category}</div>
          <div class=${styles.desc}>${product.description}</div>
          <div class=${styles.wrapperBtns}>
            <button class=${styles.btnBuy}>Add to cart</button>
            <button class=${styles.btnBuy}>Buy now</button>
          </div>
        </div>
    </div>
      `
  },
  afterRender: async () => {
    const mainImages = document.getElementById('mainImg') as HTMLImageElement;
    console.log(mainImages);
    const allImages = [...document.querySelectorAll('.secondImg')]

    allImages.forEach((image)=>{
      image.addEventListener('click', ()=>{
        const secondUrl = image.getAttribute('src') as string;
        mainImages.src = secondUrl
      })
    })


  
  },
}
