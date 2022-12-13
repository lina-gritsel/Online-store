import { Main } from './Main/Main'
import { Category } from './Category/Category'
import { CardList } from '../../components/CardList'
import styles from './Home.module.scss'
import mainStyles from './Main/Main.module.scss'
import categoryStyles from './Category/Category.module.scss'

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
  },
}
