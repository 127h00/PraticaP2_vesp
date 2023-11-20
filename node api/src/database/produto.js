const getConnection = require('./connection')

module.exports = {
  selecionarTodos: async () => {
    try {
      const result = await getConnection().query('SELECT * FROM loja.produto')
      return result.recordset
    } catch (error) {
      console.log("Error in select all Products:"+error)
    }
  },

  selecionarPorId: async (id) => {
    try {
      const result = await getConnection().query(`SELECT * FROM loja.produto WHERE id_produto=${id}`)
      // .query(`st.buscarPorID '${id}'`)
      return result.recordset[0]
    } catch (error) {
      console.log("Error in select Product by id:"+error)
    }
  }
}