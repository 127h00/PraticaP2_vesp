const express = require('express');
const funcionarioDB = require('../database/funcionario')
const funcionarioRouter = express.Router();

funcionarioRouter.get('/', async (req, res) => {
  res.status(200).json(await funcionarioDB.selecionarTodosFunc())
})

funcionarioRouter.get('/:id', async (req, res) => {
  const { id } = req.params
  const funcionario = await funcionarioDB.selecionarPorIdFunc(id)
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

module.exports = funcionarioRouter; 