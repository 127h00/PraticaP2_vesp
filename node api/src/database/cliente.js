const getConnection = require('./connection')

module.exports = {
    loginCli: async (email, senha) => {
        try {
          const result = await getConnection().query(`SELECT * FROM loja.cliente WHERE email='${email}' AND senha='${senha}'`)
          if(result.recordset.length != 1)
            return false
          return result.recordset[0]
        } catch (error) {
          console.log("Error ao logar o cliente:"+error)
        }
    },
    selecionarClientes: async () => {
        try {
          const result = await getConnection().query('SELECT * FROM Loja.cliente')
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
          const result = await getConnection().query(`INSERT INTO loja.cliente (cpf, prenome, sobrenome, email, senha, cep, bairro, rua, numero, complemento) VALUES ('${cpf}', '${prenome}', '${sobrenome}', 
            '${email}', '${senha}', '${cep}', '${bairro}', '${rua}', '${numero}', '${complemento}')`)
          return true
        } catch (err) {
            console.log("Error na criação de Cliente: "+err.code)
            return false
        }
    },

    atualizarCli: async (cpf, prenome, sobrenome, email, senha, cep, bairro, rua, numero, complemento) => {
        try {
          const result = await getConnection().query(`UPDATE loja.cliente SET prenome = '${prenome}', sobrenome = '${sobrenome}', email = '${email}',
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
          const result = await getConnection().query(`DELETE FROM loja.cliente WHERE cpf = '${cpf}'`)
          return true
        } catch(err) {
            console.log("Error ao deletar Cliente: "+err.code)
            return false
        }
    },

    enderecoCli: async () => {
        try {
          const result = await getConnection().query(`SELECT * FROM loja.v_enderecos`)
          return result.recordset
        } catch(err) {
            console.log("Error ao visualizar os endereços dos clientes: "+err.code)
        }
    },

    enderecoCliID: async (cpf) => {
        try {
          const result = await getConnection().query(`SELECT * FROM loja.v_enderecos WHERE cpf= '${cpf}'`)
          return result.recordset[0]
        } catch(err) {
            console.log("Error ao visualizar os endereços dos clientes: "+err.code)
        }
    }
}