const getConnection = require('./connection')

module.exports = {
  selecionarTodosFunc: async () => {
    try {
      const result = await getConnection().query('SELECT * FROM loja.funcionario')
      return result.recordset
    } catch (error) {
      console.log("Error ao selecionar todos os funcionarios:"+error)
    }
  },

  selecionarPorIdFunc: async (id_funcionario) => {
    try {
      const result = await getConnection().query(`SELECT * FROM loja.funcionario WHERE id_funcionario='${id_funcionario}'`)
      return result.recordset[0]
    } catch (error) {
      console.log("Error ao selecionar o funcionário pelo id:"+error)
    }
  },

  criaFunc: async (id_funcionario, nome_completo, senha) => {
    try {
      const result = await getConnection().query(`INSERT INTO loja.funcionario (id_funcionario, nome_completo, senha) VALUES ('${id_funcionario}', '${nome_completo}', '${senha}')`)
      return true
    } catch (err) {
        console.log("Error na criação do funcionário: "+err.code)
        return false
    }
  },

  atualizarFunc: async (id_funcionario, nome_completo, senha) => {
    try {
      const result = await getConnection().query(`UPDATE loja.funcionario SET nome_completo= '${nome_completo}', senha = '${senha}' WHERE id_funcionario = '${id_funcionario}'`)
      return true
    } catch(err) {
        console.log("Error ao atualizar funcionário: "+err.code)
        return falses
    }
  },

  deletarFunc: async (id_funcionario) => {
    try {
      const result = await getConnection().query(`DELETE FROM loja.funcionario WHERE id_funcionario = '${id_funcionario}'`)
      return true
    } catch(err) {
        console.log("Error ao deletar funcionário: "+err.code)
        return false
    }
  }
}