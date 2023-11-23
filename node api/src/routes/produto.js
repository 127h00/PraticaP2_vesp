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

produtoRouter.post('/postProd', async (req, res) => {
  const { id_produto, nome_produto, estoque, preco, descricao } = req.body

  if (!id_produto ||!nome_produto || !estoque || !preco || !descricao)
    return res.status(400).json({ erro: 'Dados obrigatórios não informados' })

  if(id_produto.length > 6)
    return res.status(400).json({ erro: 'O id do produto deve ter 6 números' })
  if(nome_produto.length > 60)
    return res.status(400).json({ erro: 'O nome do produto não pode ter mais de 60 caracteres' })
  if(preco.length > 8)
    return res.status(400).json({ erro: 'O preço do produto não pode ter mais de 8 digítos' })
  if(descricao.length > 400)
    return res.status(400).json({ erro: 'A descrição do produto não pode ter mais de 400 caracteres' })

  console.log(req.body)
  res.sendStatus(201)
})

produtoRouter.post('/postProd', async (req, res) => {
  const { id_produto, nome_produto, estoque, preco, descricao } = req.body

  if (!id_produto ||!nome_produto || !estoque || !preco || !descricao)
    return res.status(400).json({ erro: 'Dados obrigatórios não informados' })

  if(id_produto.length > 6)
    return res.status(400).json({ erro: 'O id do produto deve ter 6 números' })
  if(nome_produto.length > 60)
    return res.status(400).json({ erro: 'O nome do produto não pode ter mais de 60 caracteres' })
  if(preco.length > 8)
    return res.status(400).json({ erro: 'O preço do produto não pode ter mais de 8 digítos' })
  if(descricao.length > 400)
    return res.status(400).json({ erro: 'A descrição do produto não pode ter mais de 400 caracteres' })
  
  console.log(req.body)
  res.sendStatus(201)
})

module.exports = produtoRouter; // exportar o roteador