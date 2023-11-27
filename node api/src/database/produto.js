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

  selecionarPorIdProd: async (id) => {
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
  },

  atualizarProd: async (id_produto, nome_produto, estoque, preco, descricao) => {
    try {
        await getConnection().query(`UPDATE loja.produto SET nome_produto = '${nome_produto}', estoque = '${estoque}', preco = '${preco}',
            descricao = '${descricao}' WHERE id_produto = '${id_produto}'`)
        return true
    } catch(err) {
        console.log("Error ao atualizar Cliente: "+err.code)
        return false
    }
},

  deletarProd: async (id_produto) => {
      try {
          await getConnection().query(`DELETE FROM loja.produto WHERE id_produto = '${id_produto}'`)
          return true
      } catch(err) {
          console.log("Error ao deletar produto: "+err.code)
          return false
      }
  }
}