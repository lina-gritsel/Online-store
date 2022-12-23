import styles from './404Page.module.scss'

export default {
    render: async () =>{
        return `
        <div class=${styles.header}></div>
        <div class=${styles.error}> We can't find this page (404)
        </div>`
    },

    afterRender: async () =>{}
}
