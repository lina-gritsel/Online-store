import { Main } from './Main/Main'
import { CatalogCardList } from '../CatalogPage/CatalogCardList'
import mainStyles from './Main/Main.module.scss'

const CatalogPage = async (): Promise<string> => {
  return `
    <section class=${mainStyles.main}>${Main()}</section>
    <div class=container>
      <div>${await CatalogCardList()}</div>
    </div>
  `
}

export default CatalogPage
