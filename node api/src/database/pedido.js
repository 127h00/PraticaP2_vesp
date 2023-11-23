const getConnection = require('./connection')

module.exports = {
  
  fzrPedido: async (cpf_c, produto, quantidade, tamanho) => {
    try {
        await getConnection().query(`INSERT INTO Loja.pedido VALUES ${cpf_c},
        ${produto}, ${quantidade}, ${tamanho}, ${situacao}`)
      return true
    } catch (error) {
      console.log("Error ao fazer pedido:"+error)
      return false
    }
  },

}