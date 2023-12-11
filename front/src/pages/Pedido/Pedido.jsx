import PedidoApi from '../../hooks/pedidoApi';
import styles from './Pedido.module.css'

import React, { useState } from 'react';

function Pedido(){

    const [cpf_c, setCpf] = useState(' ');
    const [id_produto, setidProduto] = useState(' ');
    const [quantidade, setQuantidade] = useState(' ');
    const [tamanho, setTamanho] = useState(' ');
    
    const handleCpfChange = (event) => {
        setCpf(event.target.value);
        console.log(cpf_c);
    };

    const handleIdProdutoChange = (event) => {
        setidProduto(event.target.value);
        console.log(id_produto);
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
                        <h1>Finalizar Pedido</h1>

                        <p>Seu Cpf:</p>
                        <input
                            type="text"
                            value={cpf_c}
                            onChange={handleCpfChange}
                            placeholder="Digite seu CPF"
                        />

                        <p>Id Produto:</p>
                        <input
                            type="text"
                            value={id_produto}
                            onChange={handleIdProdutoChange}
                            placeholder="ID do produto"
                        />

                        <p>Quantidade:</p>
                        <input
                            type="text"
                            value={quantidade}
                            onChange={handleQuantidadeChange}
                            placeholder="Escolha a quantidade"
                        />

                        <p>Tamanho: (PP, P, M, G, GG) </p>
                        <input
                            type="text"
                            value={tamanho}
                            onChange={handleTamanhoChange}
                            placeholder="(PP, P, M, G, GG)"
                        />

                        <p>
                        <button 
                            onClick={async () => {
                                const ordered = await PedidoApi.makeOrder({ cpf_c, id_produto, quantidade, tamanho })
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


//className={styles.botao}