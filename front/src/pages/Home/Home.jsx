import React, { useEffect, useState } from 'react';

import ProductApi from '../../hooks/produtoApi';

import Menu from '../../components/Menu/Menu';
import Card from '../../components/Card/Card';
import banner from '../img/banner.jpeg'



import styles from './Home.module.css'
import Banner from '../../components/Banner/Banner';

function Home() {
  const [produtos, setProdutos] = useState([]);

  async function  handleProdutos() {
    await ProductApi.findAll()
      .then((response) => response? setProdutos(response) : alert('Erro ao carregar produtos'))
      .catch((error) => alert('Erro ao carregar produtos'));
  }

  useEffect(() => {
    handleProdutos();
  }, []);

  console.log(produtos);
  
  return (
    <>
      <Menu />
      <div className={styles.main}>
        <Banner image={banner}/> 
        {
          produtos?.map((produto) => (
            <Card
              key={produto.id_produto}
              id={produto.id_produto}
              image={produto.imagem_url}
              titulo={produto.nome_produto}
              preco={produto.preco}
              descricao={produto.descricao}
            />
          ))
        }
      </div>
    </>
  );
}

export default Home;
