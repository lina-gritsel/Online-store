import { Main } from './Main/Main'
import mainStyles from './Main/Main.module.scss'

export default {
  render: async () => {
    return `
    <section class=${mainStyles.main}>${Main()}</section>
    <div class=container>
    </div>
    `
  },
  afterRender: async () => {
  },
}
