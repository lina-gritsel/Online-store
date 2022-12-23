import { Main } from './Main'
import { Cart } from './Cart'
import mainStyles from './Main/Main.module.scss'

export default {
  render: async () => {
    return `
    <section class=${mainStyles.main}>${Main()}</section>
    <div class=container>
      <div>${await Cart.render()}</div>
    </div>
    `
  },
  afterRender: async () => {
    await Cart.afterRender()
  },
}
