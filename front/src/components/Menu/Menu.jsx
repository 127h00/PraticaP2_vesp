import style from "./Menu.module.css"

function Menu() {
    return (
        <header>
            <div className={style.faixa}>
                <h1 className={style.h1}>Tempted</h1>
            </div>
            <div className={style.nav}>
                <p>Home</p>
                <p>mulher</p>
                <p>Homem</p>
            </div>
        </header>
        


        
    )
}

export default Menu