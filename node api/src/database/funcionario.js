const getConnection = require('./connection')

module.exports = {
  selecionarTodosFunc: async () => {
    try {
      const result = await getConnection().query('SELECT id_funcionario FROM loja.funcionario')
      return result.recordset
    } catch (error) {
      console.log("Error ao selecionar todos os funcionarios:"+error)
    }
  },

  selecionarPorIdFunc: async (id) => {
    try {
      const result = await getConnection().query(`SELECT * FROM loja.funcionario WHERE id_funcionario=${id}`)
      return result.recordset[0]
    } catch (error) {
      console.log("Error ao selecionar o funcionário pelo id:"+error)
    }
  },

  criaFunc: async (id_funcionario, senha) => {
    try {
        await getConnection().query(`INSERT INTO loja.funcionario VALUES (${id_funcionario}, ${senha})`)
        return true
    } catch (err) {
        console.log("Error na criação do funcionário: "+err.code)
        return false
    }
  }
}