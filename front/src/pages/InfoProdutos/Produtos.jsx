import style from "./Produtos.module.css"
import jaquetapuffer from '../img/jaquetapuffer.jpeg'

function Produtos() {
    return(

        <div className={style.faixa2}>
            <h2 className={style.h2}>Tempted</h2>
            <img src={jaquetapuffer} alt=""></img>
        </div>
        
    )

}

export default Produtos