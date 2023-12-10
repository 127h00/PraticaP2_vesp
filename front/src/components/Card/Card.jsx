import styles from './Card.module.css'
import {Link} from 'react-router-dom'

function Card({ id, image, titulo, preco }) {
    return <div className={styles.roupa}>
        <img className={styles.img} src={image} />
        <h1>{titulo}</h1>
        <p id="preco">{preco}</p>
        <Link to={"/produto/"+id} className=''>Comprar</Link>
        
    </div>
}

export default Card