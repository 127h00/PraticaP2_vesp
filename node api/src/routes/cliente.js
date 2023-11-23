const express = require('express');
const clienteDB = require('../database/cliente');
const clienteRouter = express.Router();

clienteRouter.get('/', async (req, res) => {
    res.status(200).json(await clienteDB.selecionarClientes())
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

module.exports = clienteRouter;







// clienteRoutes.put("/:id", async (req, res) => {
//     const { id } = req.params
//     const { cargo, nome, email, endereco, senha, urlAvatar } = req.body
//     if(req.user.cargo !== "admin" || req.user.id != id)
//         return res.status(403).json({ error: "você não possui autorização" })
//     if(Cliente.validaId(id) && (!cargo || Cliente.validaCargo(cargo)) && (!nome || Cliente.validaNome(nome)) && (!email || Cliente.validaEmail(email)) && (!endereco || Cliente.validaEndereco(endereco)) && (!senha || Cliente.validaSenha(senha)) && (!urlAvatar || Cliente.validaUrlAvatar(urlAvatar)))
//         return res.status(400).json({ error: "parâmetros incorretos ou tipos inválidos" })

//     const cliente = await ClienteDBQ.buscarId(id)

//     if(!cliente)
//         return res.status(404).json({ error: "cliente não encontrado" })

//     if(!await ClienteDBQ.atualizar(id, {
//         cargo: cargo || cliente.cargo,
//         nome: nome || cliente.nome,
//         email: email || cliente.email,
//         endereco: endereco || cliente.endereco,
//         senha: senha || cliente.senha,
//         urlAvatar: urlAvatar || cliente.urlAvatar
//     }))
//         return res.status(401).json({ error: "erro ao atualizar cliente" })
//     return res.status(200).json({ message: "cliente atualizado com sucesso" })
// })