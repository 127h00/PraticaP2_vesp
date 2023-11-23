const express = require('express'); // receber o pacote  express
const produtoDB = require('../database/produto')
const produtoRouter = express.Router(); // criar um roteador

produtoRouter.get('/', async (req, res) => {
  res.status(200).json(await produtoDB.selecionarTodos())
})

produtoRouter.get('/:id', async (req, res) => {
  const { id } = req.params
  const produto = await produtoDB.selecionarPorId(id)
  if (!produto)
    res.status(404).json({ erro: 'Produto não encontrado' })
  res.status(200).json(produto)
})

// produtoRouter.post('/', async (req, res) => {
//   const { nome_produto, estoque, descricao } = req.body

//   if (!nome_produto || !estoque || !descricao)
//     return res.status(400).json({ erro: 'Dados obrigatórios não informados' })

//   if(nome_produto.length > 50)
//     return res.status(400).json({ erro: 'O nome do produto não pode ter mais de 50 caracteres' })
  
//   console.log(req.body)
//   res.sendStatus(201)
// })

module.exports = produtoRouter; // exportar o roteador