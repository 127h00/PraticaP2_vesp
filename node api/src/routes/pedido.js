const express = require('express'); // receber o pacote  express
const pedidoDB = require('../database/pedido')
const pedidoRouter = express.Router(); 

pedidoRouter.get('/find', async (req, res) => {
    res.status(200).json(await pedidoDB.selecionarTodosPed())
})

pedidoRouter.get('/find/:id_order', async (req, res) => {
    const { id_order } = req.params
    const pedido = await pedidoDB.selecionarPorIdPed(id_order)
    if (!pedido)
      res.status(404).json({ erro: 'pedido não encontrado' })
    res.status(200).json(pedido)
})

  pedidoRouter.get('/simplified', async (req, res) => {
    res.status(200).json(await pedidoDB.pedidoSimplif())
 })
  
pedidoRouter.get('/simplified/:id_order', async (req, res) => {
    const { id_order} = req.params
    const pedido = await pedidoDB.pedidoSimplifID(id_order)
    if (!pedido)
      res.status(404).json({ erro: 'pedido não encontrado' })
    res.status(200).json(pedido)
})
  
pedidoRouter.get('/pending', async (req, res) => {
  res.status(200).json(await pedidoDB.pedidoPendente())
})

pedidoRouter.post('/createOrder', async (req, res) => {
    const { cpf_c, id_produto, quantidade, tamanho } = req.body

    if (!cpf_c && !id_produto && !quantidade && !tamanho)
      return res.status(400).json({ erro: 'Dados obrigatórios não informados' })

    if(cpf_c.length != 11)
      return res.status(400).json({ erro: 'O CPF deve ter 11 números' })
    if(id_produto.length != 6)
      return res.status(400).json({ erro: 'O código do produto deve ter 6 números' })
    if(quantidade < 1)
      return res.status(400).json({ erro: 'A quantidade deve ser maior que 1' })
    if(tamanho != 'PP' && tamanho != 'P' && tamanho != 'M' && tamanho != 'G' && tamanho != 'GG')
      return res.status(400).json({ erro: 'Digite um tamanho válido' })

    if(!await pedidoDB.fzrPedido(cpf_c, id_produto, quantidade, tamanho))
      return res.status(501).json({ error: "erro ao cadastrar pedido" })
    res.sendStatus(201)

})

pedidoRouter.put("/alter/:id_order", async (req, res) => {
  const { id_order } = req.params
  const { cpf_c, id_produto, quantidade, tamanho, situacao } = req.body

  if(cpf_c.length != 11)
      return res.status(400).json({ erro: 'O CPF deve ter 11 números' })
  if(id_produto.length != 6)
    return res.status(400).json({ erro: 'O código do produto deve ter 6 números' })
  if(quantidade < 1)
    return res.status(400).json({ erro: 'A quantidade deve ser maior que 1' })
  if(tamanho != 'PP' && tamanho != 'P' && tamanho != 'M' && tamanho != 'G' && tamanho != 'GG')
    return res.status(400).json({ erro: 'Digite um tamanho válido' })
  if(situacao != 'P' && situacao != 'C')
    return res.status(400).json({ erro: 'Digite uma situação válida' })

  const pedido = await pedidoDB.selecionarPorIdPed(id_order)

  if(!pedido)
    return res.status(404).json({ error: "pedido não encontrado" })

  if(!await pedidoDB.atualizarPed(id_order, cpf_c, id_produto, quantidade, tamanho, situacao))
    return res.status(401).json({ error: "erro ao atualizar pedido" })
  return res.status(200).json({ message: "pedido atualizado com sucesso" })
})

pedidoRouter.delete("/delete/:id_order", async (req, res) => {
  const { id_order } = req.params
  if(id_order < 1)
      return res.status(400).json({ erro: 'Digite um código válido' })

  if(!await pedidoDB.selecionarPorIdPed(id_order))
      return res.status(404).json({ error: "pedido não encontrado" })

  if(!await pedidoDB.deletarPed(id_order))
      return res.status(401).json({ error: "erro ao deletar pedido" })
  return res.status(200).json({ message: "pedido deletado com sucesso" })
})

module.exports = pedidoRouter;