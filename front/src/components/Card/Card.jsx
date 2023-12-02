import styles from './Card.module.css'

function Card({ image, titulo, preco }) {
    return <div className={styles.roupa}>
        <img className={styles.img} src={image} />
        <p id={styles.titulo}>{titulo}</p>
        <p id="preco">{preco}</p>
        <button>Comprar</button>
        
    </div>
}

export default Card