import style from "./Menu.module.css"
import {Link} from 'react-router-dom'

function Menu() {
    return (
        <header>
            <div className={style.faixa}>
                <h1 className={style.h1}>Tempted</h1>
            </div>
            <div className={style.nav}>
                <Link to={"/login"}>login</Link>
                <Link to={"/cadastre-se"}>Cadastra-se</Link>
            </div>
        </header>       
    )
}

export default Menu