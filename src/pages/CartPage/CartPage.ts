import { Main } from './Main'
import { Cart } from './Cart'

import mainStyles from './Main/Main.module.scss'

export default {
  render: async () => {
    const cards = await Cart.render()
    return `
    <section class=${mainStyles.main}>${Main()}</section>
    <div class=container>
      <div>${cards}</div>
    </div>
    `
  },
  afterRender: async () => {
    await Cart.afterRender()
  },
}
