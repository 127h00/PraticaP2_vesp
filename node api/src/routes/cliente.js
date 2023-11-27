const express = require('express');
const clienteDB = require('../database/cliente');
const clienteRouter = express.Router();

clienteRouter.get('/', async (req, res) => {
    res.status(200).json(await clienteDB.selecionarClientes())
})

clienteRouter.get('/:cpf', async (req, res) => {
    const { cpf } = req.params
    const cliente = await clienteDB.selecionarPorIdCli(cpf)
    if (!cliente)
      res.status(404).json({ erro: 'cliente não encontrado' })
    res.status(200).json(cliente)
})

clienteRouter.post('/cadastro', async (req, res) => {
    const { cpf, prenome, sobrenome, email, senha, cep, bairro, rua, numero,
            complemento } = req.body

    if (!cpf || !prenome || !sobrenome || !email || !senha || !cep || !bairro || !rua
        || !numero)
        return res.status(400).json({ erro: 'Dados obrigatórios não informados' })

    if(cpf.length != 11)
        return res.status(400).json({ erro: 'O CPF deve ter 11 números' })
    if(prenome.length > 20)
        return res.status(400).json({ erro: 'O prenome não pode ter mais de 20 caracteres' })
    if(sobrenome.length > 50)
        return res.status(400).json({ erro: 'O sobrenome não pode ter mais de 50 caracteres' })
    if(email.length > 50)
        return res.status(400).json({ erro: 'O e-mail não pode ter mais de 50 caracteres' })
    if(senha.length > 30)
        return res.status(400).json({ erro: 'A senha não pode ter mais de 30 caracteres' })
    if(cep.length != 8)
        return res.status(400).json({ erro: 'O CEP deve ter 8 números' })
    if(bairro.length > 60)
        return res.status(400).json({ erro: 'O bairro não pode ter mais de 60 caracteres' })
    if(rua.length > 60)
        return res.status(400).json({ erro: 'A rua não pode ter mais de 60 caracteres' })
    if(numero.length > 3)
        return res.status(400).json({ erro: 'O número da casa não pode ter mais de 3 caracteres' })
    if(complemento != null && complemento.length > 70)
        return res.status(400).json({ erro: 'O complemento não pode ter mais de 70 caracteres' })

    console.log(req.body)
    res.sendStatus(201)
})

clienteRouter.put("/:cpf", async (req, res) => {
    const { cpf } = req.params
    const { prenome, sobrenome, email, senha, cep, bairro, rua, numero,
            complemento } = req.body

    if(prenome.length > 20)
        return res.status(400).json({ erro: 'O prenome não pode ter mais de 20 caracteres' })
    if(sobrenome.length > 50)
        return res.status(400).json({ erro: 'O sobrenome não pode ter mais de 50 caracteres' })
    if(email.length > 50)
        return res.status(400).json({ erro: 'O e-mail não pode ter mais de 50 caracteres' })
    if(senha.length > 30)
        return res.status(400).json({ erro: 'A senha não pode ter mais de 30 caracteres' })
    if(cep.length != 8)
        return res.status(400).json({ erro: 'O CEP deve ter 8 números' })
    if(bairro.length > 60)
        return res.status(400).json({ erro: 'O bairro não pode ter mais de 60 caracteres' })
    if(rua.length > 60)
        return res.status(400).json({ erro: 'A rua não pode ter mais de 60 caracteres' })
    if(numero.length > 3)
        return res.status(400).json({ erro: 'O número da casa não pode ter mais de 3 caracteres' })
    if(complemento != null && complemento.length > 70)
        return res.status(400).json({ erro: 'O complemento não pode ter mais de 70 caracteres' })

    const cliente = await clienteDB.selecionarPorIdCli(cpf)

    if(!cliente)
        return res.status(404).json({ error: "cliente não encontrado" })

    if(!await clienteDB.atualizarCli(cpf, {
        prenome, sobrenome, email, senha, cep, bairro, rua, numero, complemento
    }))
        return res.status(401).json({ error: "erro ao atualizar cliente" })
    return res.status(200).json({ message: "cliente atualizado com sucesso" })
})

clienteRouter.delete("/:cpf", async (req, res) => {
    const { cpf } = req.params
    if(cpf.length != 11)
        return res.status(400).json({ erro: 'O CPF deve ter 11 números' })

    if(!await clienteDB.selecionarPorIdCli(cpf))
        return res.status(404).json({ error: "cliente não encontrado" })

    if(!await clienteDB.deletarCli(cpf))
        return res.status(401).json({ error: "erro ao deletar cliente" })
    return res.status(200).json({ message: "cliente deletado com sucesso" })
})

module.exports = clienteRouter;