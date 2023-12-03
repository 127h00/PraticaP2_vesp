import styles from './Card.module.css'
import {Link} from 'react-router-dom'

function Card({ image, titulo, preco }) {
    return <div className={styles.roupa}>
        <img className={styles.img} src={image} />
        <p id={styles.titulo}>{titulo}</p>
        <p id="preco">{preco}</p>
        <Link to={"/produtos"}>Comprar</Link>
        
    </div>
}

export default Card