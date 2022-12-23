import { Footer } from '../Footer'
import { Header } from '../Header'
import styles from './Layout.module.scss'

export const Layout = async (children: Function): Promise<string> =>
  `
    ${Header()}
    <div class=${styles.container}>
      ${await children()}
    </div>
    ${Footer()}
  `
