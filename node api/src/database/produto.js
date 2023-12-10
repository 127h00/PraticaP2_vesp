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

  selecionarPorIdProd: async (id_produto) => {
    try {
      const result = await getConnection().query(`SELECT * FROM loja.produto WHERE id_produto='${id_produto}'`)
      return result.recordset[0]
    } catch (error) {
      console.log("Error ao selecionar o produto pelo id:"+error)
    }
  },

  postaProd: async (id_produto, nome_produto, estoque, preco, descricao, imagem_url) => {
    try {
      const result = await getConnection().query(`INSERT INTO loja.produto (id_produto, nome_produto, estoque, preco, descricao, imagem_url) VALUES ('${id_produto}', '${nome_produto}', ${estoque}, ${preco}, '${descricao}', '${imagem_url}')`)
      return true
    } catch (err) {
        console.log("Error na criação do produto: "+err.code)
        return false
    }
  },

  atualizarProd: async (id_produto, nome_produto, estoque, preco, descricao, imagem_url) => {
    try {
      const result = await getConnection().query(`UPDATE loja.produto SET nome_produto = '${nome_produto}', estoque = ${estoque}, preco = '${preco}',
          descricao = '${descricao}', imagem_url = '${imagem_url}' WHERE id_produto = '${id_produto}'`)
      return true
    } catch(err) {
        return false
        console.log("Error ao atualizar Cliente: "+err.code)
    }
},

  deletarProd: async (id_produto) => {
      try {
        const result = await getConnection().query(`exec Loja.spExcluiProduto '${id_produto}'`)
        return true
      } catch(err) {
          console.log("Error ao deletar produto: "+err.code)
          return false
      }
  },

  baixoEstoque: async () => {
    try {
      const result = await getConnection().query('SELECT * FROM loja.v_baixoEstoque')
      return result.recordset
    } catch (error) {
      console.log("Error ao selecionar os produtos com pouco estoque:"+error)
    }
  }
}