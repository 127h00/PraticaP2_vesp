import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

import ProdutoApi from "../../hooks/produtoApi"

import style from "./Produtos.module.css"

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
            <h3 className={style.preco}>{produto?.preco}</h3>
            <button className={style.btnProduto}>Comprar</button>
            
        </>

    )

}

export default Produtos