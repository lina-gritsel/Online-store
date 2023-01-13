import { Main } from './Main'
import { CatalogCardList } from '../CatalogPage/CatalogCardList'

import mainStyles from './Main/Main.module.scss'

export default {
  render: async () => {
    return `
    <section class=${mainStyles.main}>${Main()}</section>
    <div class=container>
      <div>${await CatalogCardList.render()}</div>
    </div>
    `
  },
  afterRender: async () => {
    await CatalogCardList.afterRender()
  }
}
