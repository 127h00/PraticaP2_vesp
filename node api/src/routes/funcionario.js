const express = require('express');
const funcionarioDB = require('../database/funcionario')
const funcionarioRouter = express.Router();

funcionarioRouter.get('/', async (req, res) => {
  res.status(200).json(await funcionarioDB.selecionarTodosFunc())
})

funcionarioRouter.get('/:id_funcionario', async (req, res) => {
  const { id_funcionario } = req.params
  const funcionario = await funcionarioDB.selecionarPorIdFunc(id_funcionario)
  if (!funcionario)
    res.status(404).json({ erro: 'funcionário não encontrado' })
  res.status(200).json(funcionario)
})

funcionarioRouter.post('/postFunc', async (req, res) => {
  const { id_funcionario, senha } = req.body

  if (!id_funcionario || !senha)
    return res.status(400).json({ erro: 'Dados obrigatórios não informados' })

  if(id_funcionario.length != 4)
    return res.status(400).json({ erro: 'O id do funcionário deve ter 4 números' })
  if(senha.length > 30)
    return res.status(400).json({ erro: 'A senha não pode ter mais de 30 caracteres' })

  console.log(req.body)
  res.sendStatus(201)
})

funcionarioRouter.put("/:id_funcionario", async (req, res) => {
  const { id_funcionario } = req.params
  const { senha } = req.body

  if(id_funcionario.length != 4)
    return res.status(400).json({ erro: 'O id do funcionário deve ter 4 números' })
  if(senha.length > 30)
    return res.status(400).json({ erro: 'A senha não pode ter mais de 30 caracteres' })

  const funcionario = await funcionarioDB.selecionarPorIdFunc(id_funcionario)

  if(!funcionario)
      return res.status(404).json({ error: "funcionário não encontrado" })

  if(!await funcionarioDB.atualizarFunc(id_funcionario, {
      senha }))
      return res.status(401).json({ error: "erro ao atualizar funcionário" })
  return res.status(200).json({ message: "funcionário atualizado com sucesso" })
})

funcionarioRouter.delete("/:id_funcionario", async (req, res) => {
  const { id_funcionario } = req.params
  if(id_funcionario.length != 4)
    return res.status(400).json({ erro: 'O id do funcionário deve ter 4 números' })

  if(!await funcionarioDB.selecionarPorIdFunc(id_funcionario))
      return res.status(404).json({ error: "funcionario não encontrado" })

  if(!await funcionarioDB.deletarFunc(id_funcionario))
      return res.status(401).json({ error: "erro ao deletar funcionário" })
  return res.status(200).json({ message: "funcionário deletado com sucesso" })
})

module.exports = funcionarioRouter; 