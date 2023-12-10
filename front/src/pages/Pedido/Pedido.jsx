import PedidoApi from '../../hooks/pedidoApi';
import styles from './Pedido.module.css'

import React, { useState } from 'react';

function Pedido(){

    const [cpf, setCpf] = useState(' ');
    const [idProduto, setidProduto] = useState(' ');
    const [quantidade, setQuantidade] = useState(' ');
    const [tamanho, setTamanho] = useState(' ');
    
    const handleCpfChange = (event) => {
        setCpf(event.target.value);
        console.log(cpf);
    };

    const handleIdProdutoChange = (event) => {
        setidProduto(event.target.value);
        console.log(idProduto);
    };

    const handleQuantidadeChange = (event) => {
        setQuantidade(event.target.value);
        console.log(quantidade);
    };

    const handleTamanhoChange = (event) => {
        setTamanho(event.target.value);
        console.log(tamanho);
    };

        return(
            <main>
                <div className={styles.section}>

                    <div className={styles.Pedido}>
                    <h1>Faça um Pedido</h1>

                    <p>Seu cpf:</p>
                    <input
                        type="number"
                        value={cpf}
                        onChange={handleCpfChange}
                        placeholder="Digite seu CPF"
                    />

                    <p>Id Produto</p>
                    <input
                        type="text"
                        value={idProduto}
                        onChange={handleIdProdutoChange}
                        placeholder="ID do produto escolhido"
                    />

                    <p>Quantidade:</p>
                    <input
                        type="number"
                        value={quantidade}
                        onChange={handleQuantidadeChange}
                        placeholder="Escolha a quantidade"
                    />

                    <p>Tamanho:</p>
                    <input
                        type="text"
                        value={tamanho}
                        onChange={handleTamanhoChange}
                        placeholder="(PP, P, M, G, GG) "
                    />

                    <p>
                    <button 
                        onClick={async () => {
                            const ordered = await PedidoApi.makeOrder({ cpf, idProduto, quantidade, tamanho })
                            console.log(ordered)
                            localStorage.setItem('ordered', ordered)
                            ordered ? window.location.href = '/' : alert('Parece que há algum erro nos dados, tente novamente!')
                        }}
                    >
                        Fazer pedido
                    </button>
                    </p>

                    </div>
                </div>
            </main>
        )
}

export default Pedido;