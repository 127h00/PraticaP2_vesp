import styles from './Banner.module.css'

function Banner({image}) {
    return <div className={styles.h3}>
        <img className={styles.img} src={image}/>

    </div>
}

export default Banner