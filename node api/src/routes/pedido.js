const express = require('express'); // receber o pacote  express
const pedidoDB = require('../database/pedido')
const pedidoRouter = express.Router(); 

pedidoRouter.get('/', async (req, res) => {
    res.status(200).json(await pedidoDB.selecionarTodosPed())
})

pedidoRouter.get('/:id', async (req, res) => {
    const { id } = req.params
    const pedido = await pedidoDB.selecionarPorIdPed(id)
    if (!pedido)
      res.status(404).json({ erro: 'pedido não encontrado' })
    res.status(200).json(pedido)
  })

pedidoRouter.post('/fzrPedido', async (req, res) => {
    const { cpf_c, produto, quantidade, tamanho } = req.body

    if (!cpf_c || !produto || !quantidade || !tamanho)
    return res.status(400).json({ erro: 'Dados obrigatórios não informados' })

    if(cpf_c.length != 11)
    return res.status(400).json({ erro: 'O CPF deve ter 11 números' })
    if(produto != 6)
    return res.status(400).json({ erro: 'O código do produto deve ter 6 números' })
    if(tamanho != 'PP' || tamanho != 'P' || tamanho != 'M' || tamanho != 'G' || tamanho != 'GG')

    console.log(req.body)
    res.sendStatus(201)
})

module.exports = pedidoRouter;
