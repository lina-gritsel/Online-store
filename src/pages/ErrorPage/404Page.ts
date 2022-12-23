import styles from './404Page.module.scss'

export default {
    render: async () =>{
        return `
        <div class=${styles.header}></div>
        <div> We can't find this page.
        </div>`
    },

    afterRender: async () =>{}
}
