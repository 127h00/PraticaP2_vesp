const getConnection = require('./connection')

module.exports = {
    selecionarClientes: async () => {
        try {
            result = await getConnection().query('SELECT * FROM Loja.cliente')
        return result.recordset 
        } catch (error) {
            console.log("Error ao selecionar todos os produtos:"+error)
        }
    },

    cadastraCliente: async (cpf, prenome, sobrenome, email, senha, cep, bairro, rua, numero, complemento) => {
        try {
            await getConnection().query(`INSERT INTO loja.cliente VALUES (${cpf}, ${prenome}, ${sobrenome}, ${email}, ${senha},
                                        ${cep}, ${bairro}, ${rua}, ${numero}, ${complemento})`)
            return true
        } catch (err) {
            console.log("Error na criação de Cliente: "+err.code)
            return false
        }
    }





}