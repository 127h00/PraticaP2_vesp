import Menu from '../../components/Menu/Menu';
import Card from '../../components/Card/Card';
import blusabranca from '../img/blusinha_branca.jpeg'
import jaquetavermelha from '../img/jaquetavermelha.jpeg'
import saiapreta from '../img/saiapreta.jpeg'
import jaquetabranca from '../img/jaquetabranca.jpeg'
import calçajoggermilitar from '../img/calçajoggermilitar.jpeg'
import regatabrancamasc from '../img/regatabrancamasc.jpeg'
import calca from '../img/calca.jpeg'
import jaquetapretamasc from '../img/jaquetapretamasc.jpeg'
import calcafem from '../img/calcafem.png'
import jaquetapuffer from '../img/jaquetapuffer.jpeg'
import banner from '../img/banner.jpeg'



import styles from './Home.module.css'
import Banner from '../../components/Banner/Banner';

function Home() {

  return (
    <>
      <Menu />
      <div className={styles.main}>
        <Banner image={banner}/> 
        <Card image={jaquetapuffer} titulo={"Jaqueta Puffer"} preco={"R$200"} />
        <Card image={blusabranca} titulo={"Baby tee USA"} preco={"R$43.50"} />
        <Card image={jaquetavermelha} titulo={"Jaqueta vermelha"} preco={"R$110.30"} />
        <Card image={saiapreta} titulo={"Mini saia preta"} preco={"R$ 47.80"} />
        <Card image={jaquetabranca} titulo={"Blusa moletom branca"} preco={"R$84.90"} />
        <Card image={calçajoggermilitar} titulo={"Calça jogger"} preco={"R$68.45"} />
        <Card image={regatabrancamasc} titulo={"Regata branca"} preco={"R$31.90"} />
        <Card image={calca} titulo={"Calça jeans oversized"} preco={"R$157"} />
        <Card image={jaquetapretamasc} titulo={"Jaqueta preta"} preco={"R$132"} />
        <Card image={calcafem} titulo={"Calça jeans wide leg"} preco={"R$146"} />
      </div>
    </>
  );
}

export default Home;
