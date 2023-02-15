import styles from './CatalogCardList.module.scss'

export const copyLink = () =>{
    const copyLinkBtn = document.getElementById("copyLink") as HTMLButtonElement;

    copyLinkBtn?.addEventListener('click', () =>{
        const url = document.URL
        navigator.clipboard.writeText(url);

        copyLinkBtn.classList.add(`${styles.linkIsCopy}`)

        setTimeout(() => {
            copyLinkBtn.classList.remove(`${styles.linkIsCopy}`)

          }, 1000)

    })
}