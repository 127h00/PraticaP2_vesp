const getConnection = require('./connection')

module.exports = {
  selecionarTodosPed: async () => {
    try {
      const result = await getConnection().query('SELECT * FROM loja.produto')
      return result.recordset
    } catch (error) {
      console.log("Error ao selecionar todos os produtos:"+error)
    }
  },

  selecionarPorIdPed: async (id) => {
    try {
      const result = await getConnection().query(`SELECT * FROM loja.pedido WHERE id_pedido=${id}`)
      return result.recordset[0]
    } catch (error) {
      console.log("Error ao selecionar o pedido pelo id:"+error)
    }
  },

  fzrPedido: async (cpf_c, produto, quantidade, tamanho) => {
    try {
        await getConnection().query(`INSERT INTO Loja.pedido VALUES ${cpf_c},
        ${produto}, ${quantidade}, ${tamanho}, 'P'`)
      return true
    } catch (error) {
      console.log("Error ao fazer pedido:"+error)
      return false
    }
  },

}