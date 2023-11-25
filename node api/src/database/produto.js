const getConnection = require('./connection')

module.exports = {
  selecionarTodosProd: async () => {
    try {
      const result = await getConnection().query('SELECT * FROM loja.produto')
      return result.recordset
    } catch (error) {
      console.log("Error ao selecionar todos os produtos:"+error)
    }
  },

  selecionarPorId: async (id) => {
    try {
      const result = await getConnection().query(`SELECT * FROM loja.produto WHERE id_produto=${id}`)
      // .query(`st.buscarPorID '${id}'`)
      return result.recordset[0]
    } catch (error) {
      console.log("Error ao selecionar o produto pelo id:"+error)
    }
  },

  postaProd: async (id_produto, nome_produto, estoque, preco, descricao) => {
    try {
        await getConnection().query(`INSERT INTO loja.cliente VALUES (${id_produto}, ${nome_produto}, ${estoque}, ${preco}, ${descricao})`)
        return true
    } catch (err) {
        console.log("Error na criação do produto: "+err.code)
        return false
    }
  }
}