const express = require('express');
const funcionarioDB = require('../database/funcionario')
const funcionarioRouter = express.Router();

funcionarioRouter.get('/find', async (req, res) => {
  res.status(200).json(await funcionarioDB.selecionarTodosFunc())
})

funcionarioRouter.get('/find/:id_employee', async (req, res) => {
  const { id_employee } = req.params
  const funcionario = await funcionarioDB.selecionarPorIdFunc(id_employee)
  if (!funcionario)
    res.status(404).json({ erro: 'funcionário não encontrado' })
  res.status(200).json(funcionario)
})

funcionarioRouter.post('/create', async (req, res) => {
  const { id_funcionario, nome_completo, senha } = req.body

  if (!id_funcionario && !senha)
    return res.status(400).json({ erro: 'Dados obrigatórios não informados' })

  if(id_funcionario.length != 4)
    return res.status(400).json({ erro: 'O id do funcionário deve ter 4 números' })
  if(nome_completo.length > 60)
    return res.status(400).json({ erro: 'O nome não pode ter mais de 60 caracteres' })
  if(senha.length > 30)
    return res.status(400).json({ erro: 'A senha não pode ter mais de 30 caracteres' })

  if(!await funcionarioDB.criaFunc(id_funcionario, nome_completo, senha))
  return res.status(501).json({ error: "erro ao cadastrar funcionário" })
  res.sendStatus(201)
})

funcionarioRouter.put("/alter/:id_employee", async (req, res) => {
  const { id_employee } = req.params
  const { nome_completo, senha } = req.body

  if(id_employee.length != 4)
    return res.status(400).json({ erro: 'O id do funcionário deve ter 4 números' })
  if(nome_completo.length > 60)
    return res.status(400).json({ erro: 'O nome não pode ter mais de 60 caracteres' })
  if(senha.length > 30)
    return res.status(400).json({ erro: 'A senha não pode ter mais de 30 caracteres' })

  const funcionario = await funcionarioDB.selecionarPorIdFunc(id_employee)

  if(!funcionario)
      return res.status(404).json({ error: "funcionário não encontrado" })

  if(!await funcionarioDB.atualizarFunc(id_employee, nome_completo, senha))
      return res.status(401).json({ error: "erro ao atualizar funcionário" })
  return res.status(200).json({ message: "funcionário atualizado com sucesso" })
})

funcionarioRouter.delete("/delete/:id_employee", async (req, res) => {
  const { id_employee } = req.params
  if(id_employee.length != 4)
    return res.status(400).json({ erro: 'O id do funcionário deve ter 4 números' })

  if(!await funcionarioDB.selecionarPorIdFunc(id_employee))
      return res.status(404).json({ error: "funcionario não encontrado" })

  if(!await funcionarioDB.deletarFunc(id_employee))
      return res.status(401).json({ error: "erro ao deletar funcionário" })
  return res.status(200).json({ message: "funcionário deletado com sucesso" })
})

module.exports = funcionarioRouter; 