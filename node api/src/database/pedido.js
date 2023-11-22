const getConnection = require('./connection')

module.exports = {
  fzrPedido: async () => {
    try {
      const result = await getConnection().query(`INSERT INTO Loja.pedido VALUES ${cpf_c},
        ${produto}, ${quantidade}, ${tamanho}, ${situacao}`)
      return result.recordset
    } catch (error) {
      console.log("Error in select all Products:"+error)
    }
  },


  
}