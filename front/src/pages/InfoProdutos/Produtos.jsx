import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PedidoApi from "../../hooks/pedidoApi";
import ProdutoApi from "../../hooks/produtoApi";
import style from "./Produtos.module.css";
import {Link} from 'react-router-dom'

function Produtos() {
    const [produto, setProduto] = useState()
    const { id } = useParams()

    async function handleProduto() {
        await ProdutoApi.findById(id)
            .then((res) => res? setProduto(res) : alert("Produto não encontrado"))
            .catch((err) => alert("não foi possível se conectar com a API"))
    }

    useEffect(() => {
        handleProduto()
    }, [])

    return(
        <>
            <div className={style.faixa2}>
            <h2 className={style.h2}>Tempted</h2>
            </div>
            <img className={style.img} src={produto?.imagem_url} />    
            <h1 className={style.nome_produto}>{produto?.nome_produto}</h1>    
            <h2 className={style.descricao}>{produto?.descricao}</h2>
            <h3 className={style.preco}>R${produto?.preco}</h3>
            <button className={style.btnProduto}><Link to={"/createOrder"}>Comprar</Link></button>
            
        </>

    )

}

export default Produtos