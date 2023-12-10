const express = require('express'); // receber o pacote  express
const produtoDB = require('../database/produto')
const produtoRouter = express.Router(); // criar um roteador

produtoRouter.get('/find', async (req, res) => {
  res.status(200).json(await produtoDB.selecionarTodosProd())
})

produtoRouter.get('/find/:id_product', async (req, res) => {
  const { id_product } = req.params
  const produto = await produtoDB.selecionarPorIdProd(id_product)
  if (!produto)
    res.status(404).json({ erro: 'Produto não encontrado' })
  res.status(200).json(produto)
})

produtoRouter.get('/stock/low', async (req, res) => {
  res.status(200).json(await produtoDB.baixoEstoque())
})

produtoRouter.post('/create', async (req, res) => {
  const { id_produto, nome_produto, estoque, preco, descricao, imagem_url } = req.body

  if (!id_produto && !nome_produto && !estoque && !preco && !descricao)
    return res.status(400).json({ erro: 'Dados obrigatórios não informados' })

  if(id_produto.length > 6)
    return res.status(400).json({ erro: 'O id do produto deve ter 6 números' })
  if(nome_produto.length > 60)
    return res.status(400).json({ erro: 'O nome do produto não pode ter mais de 60 caracteres' })
  if(estoque < 0)
    return res.status(400).json({ erro: 'O estoque não pode ser negativo'})
  if(preco.length > 8)
    return res.status(400).json({ erro: 'O preço do produto não pode ter mais de 8 digítos' })
  if(descricao.length > 400)
    return res.status(400).json({ erro: 'A descrição do produto não pode ter mais de 400 caracteres' })

  if(!await produtoDB.postaProd(id_produto, nome_produto, estoque, preco, descricao, imagem_url))
    return res.status(501).json({ error: "erro ao criar produto" })
  res.sendStatus(201)
})

produtoRouter.put("/alter/:id_product", async (req, res) => {
  const { id_product } = req.params
  const { nome_produto, estoque, preco, descricao, imagem_url } = req.body

  if(id_product.length > 6)
    return res.status(400).json({ erro: 'O id do produto deve ter 6 números' })
  if(nome_produto.length > 60)
    return res.status(400).json({ erro: 'O nome do produto não pode ter mais de 60 caracteres' })
  if(estoque < 0)
    return res.status(400).json({ erro: 'O estoque não pode ser negativo'})
  if(preco.length > 8)
    return res.status(400).json({ erro: 'O preço do produto não pode ter mais de 8 digítos' })
  if(descricao.length > 400)
    return res.status(400).json({ erro: 'A descrição do produto não pode ter mais de 400 caracteres' })

  const produto = await produtoDB.selecionarPorIdProd(id_product)

  if(!produto)
      return res.status(404).json({ error: "produto não encontrado" })

  if(!await produtoDB.atualizarProd(id_product, nome_produto, estoque, preco, descricao, imagem_url))
      return res.status(401).json({ error: "erro ao atualizar produto" })
  return res.status(200).json({ message: "produto atualizado com sucesso" })
})

produtoRouter.delete("/delete/:id_product", async (req, res) => {
  const { id_product } = req.params
  if(id_product.length > 6)
    return res.status(400).json({ erro: 'O id do produto deve ter 6 números' })

  if(!await produtoDB.selecionarPorIdProd(id_product))
      return res.status(404).json({ error: "produto não encontrado" })

  if(!await produtoDB.deletarProd(id_product))
      return res.status(401).json({ error: "erro ao deletar produto" })
  return res.status(200).json({ message: "produto deletado com sucesso" })
})

module.exports = produtoRouter; // exportar o roteador