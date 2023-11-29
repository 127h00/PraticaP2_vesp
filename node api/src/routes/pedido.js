const express = require('express'); // receber o pacote  express
const pedidoDB = require('../database/pedido')
const pedidoRouter = express.Router(); 

pedidoRouter.get('/', async (req, res) => {
    res.status(200).json(await pedidoDB.selecionarTodosPed())
})

pedidoRouter.get('/:id_pedido', async (req, res) => {
    const { id_pedido } = req.params
    const pedido = await pedidoDB.selecionarPorIdPed(id_pedido)
    if (!pedido)
      res.status(404).json({ erro: 'pedido não encontrado' })
    res.status(200).json(pedido)
})

  pedidoRouter.get('/pedidoSimplif', async (req, res) => {
    res.status(200).json(await pedidoDB.pedidoSimplif())
 })
  
pedidoRouter.get('/:id_pedido', async (req, res) => {
    const { id_pedido } = req.params
    const pedido = await pedidoDB.selecionarPorIdPed(id_pedido)
    if (!pedido)
      res.status(404).json({ erro: 'pedido não encontrado' })
    res.status(200).json(pedido)
  })
  
  pedidoRouter.get('/pedidoPendente', async (req, res) => {
    res.status(200).json(await pedidoDB.pedidoPendente())
  })

pedidoRouter.post('/fzrPedido', async (req, res) => {
    const { cpf_c, produto, quantidade, tamanho } = req.body

    if (!cpf_c || !produto || !quantidade || !tamanho)
      return res.status(400).json({ erro: 'Dados obrigatórios não informados' })

    if(cpf_c.length != 11)
      return res.status(400).json({ erro: 'O CPF deve ter 11 números' })
    if(produto != 6)
      return res.status(400).json({ erro: 'O código do produto deve ter 6 números' })
    if(quantidade < 1)
      return res.status(400).json({ erro: 'A quantidade deve ser maior que 1' })
    if(tamanho != 'PP' || tamanho != 'P' || tamanho != 'M' || tamanho != 'G' || tamanho != 'GG')
      return res.status(400).json({ erro: 'Digite um tamanho válido' })

    console.log(req.body)
    res.sendStatus(201)
})

pedidoRouter.put("/:id_pedido", async (req, res) => {
  const { id_pedido } = req.params
  const { cpf_c, produto, quantidade, tamanho, situacao } = req.body

  if(cpf_c.length != 11)
      return res.status(400).json({ erro: 'O CPF deve ter 11 números' })
    if(produto != 6)
      return res.status(400).json({ erro: 'O código do produto deve ter 6 números' })
    if(quantidade < 1)
      return res.status(400).json({ erro: 'A quantidade deve ser maior que 1' })
    if(tamanho != 'PP' || tamanho != 'P' || tamanho != 'M' || tamanho != 'G' || tamanho != 'GG')
      return res.status(400).json({ erro: 'Digite um tamanho válido' })
    if(situacao != 'P' || situacao != 'C')
      return res.status(400).json({ erro: 'Digite uma situação válida' })

  const pedido = await pedidoDB.selecionarPorIdPed(id_pedido)

  if(!pedido)
      return res.status(404).json({ error: "pedido não encontrado" })

  if(!await pedidoDB.atualizarPed(id_pedido, {
      cpf_c, produto, quantidade, tamanho, situacao
  }))
      return res.status(401).json({ error: "erro ao atualizar pedido" })
  return res.status(200).json({ message: "pedido atualizado com sucesso" })
})

pedidoRouter.delete("/:id", async (req, res) => {
  const { id_pedido } = req.params
  if(id_pedido != 6)
      return res.status(400).json({ erro: 'O ID do pedido deve ter 6 números' })

  if(!await pedidoDB.selecionarPorIdPed(id_pedido))
      return res.status(404).json({ error: "pedido não encontrado" })

  if(!await pedidoDB.deletarPed(id_pedido))
      return res.status(401).json({ error: "erro ao deletar pedido" })
  return res.status(200).json({ message: "pedido deletado com sucesso" })
})

module.exports = pedidoRouter;