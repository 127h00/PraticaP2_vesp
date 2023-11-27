const getConnection = require('./connection')

module.exports = {
    selecionarClientes: async () => {
        try {
            result = await getConnection().query('SELECT * FROM Loja.cliente')
        return result.recordset 
        } catch (error) {
            console.log("Error ao selecionar todos os clientes:"+error)
        }
    },

    selecionarPorIdCli: async (cpf) => {
        try {
          const result = await getConnection().query(`SELECT * FROM loja.cliente WHERE cpf='${cpf}'`)
          return result.recordset[0]
        } catch (error) {
          console.log("Error ao selecionar o cliente pelo cpf:"+error)
        }
    },

    cadastraCliente: async (cpf, prenome, sobrenome, email, senha, cep, bairro, rua, numero, complemento) => {
        try {
            await getConnection().query(`INSERT INTO loja.cliente VALUES ('${cpf}', '${prenome}', '${sobrenome}', '${email}', '${senha}',
                '${cep}', '${bairro}', '${rua}', '${numero}', '${complemento}')`)
            return true
        } catch (err) {
            console.log("Error na criação de Cliente: "+err.code)
            return false
        }
    },

    atualizarCli: async (cpf, prenome, sobrenome, email, senha, cep, bairro, rua, numero, complemento) => {
        try {
            await getConnection().query(`UPDATE loja.cliente SET prenome = '${prenome}', sobrenome = '${sobrenome}', email = '${email}',
                senha = '${senha}', cep = '${cep}', bairro = '${bairro}', rua = '${rua}', numero = '${numero}', complemento = '${complemento}'
                WHERE cpf = '${cpf}'`)
            return true
        } catch(err) {
            console.log("Error ao atualizar Cliente: "+err.code)
            return false
        }
    },

    deletarCli: async (cpf) => {
        try {
            await getConnection().query(`DELETE FROM loja.cliente WHERE cpf = '${cpf}'`)
            return true
        } catch(err) {
            console.log("Error ao deletar Cliente: "+err.code)
            return false
        }
    }
}