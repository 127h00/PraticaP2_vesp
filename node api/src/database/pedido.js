const getConnection = require('./connection')

module.exports = {
  selecionarTodosPed: async () => {
    try {
      const result = await getConnection().query('SELECT * FROM loja.pedido')
      return result.recordset
    } catch (error) {
      console.log("Error ao selecionar todos os produtos:"+error)
    }
  },

  selecionarPorIdPed: async (id_pedido) => {
    try {
      const result = await getConnection().query(`SELECT * FROM loja.pedido WHERE id_pedido=${id_pedido}`)
      return result.recordset[0]
    } catch (error) {
      console.log("Error ao selecionar o pedido pelo id:"+error)
    }
  },

  fzrPedido: async (cpf_c, id_produto, quantidade, tamanho) => {
    try {
      const result = await getConnection().query(`INSERT INTO Loja.pedido VALUES ('${cpf_c}', '${id_produto}', ${quantidade}, '${tamanho}', 'P')`)
      return true
    } catch(err) {
      return false
      console.log("Error ao fazer o pedido: "+err.code)
    }
  },

  atualizarPed: async (id_pedido, cpf_c, produto, quantidade, tamanho, situacao) => {
    try {
        const result = await getConnection().query(`UPDATE loja.pedido SET cpf_c = '${cpf_c}', produto = '${produto}', quantidade = ${quantidade},
            tamanho = '${tamanho}', situacao = '${situacao}' WHERE id_pedido = '${id_pedido}'`)
        return true
    } catch(err) {
        return false
        console.log("Error ao atualizar pedido: "+err.code)
    }
  },

  deletarPed: async (id_pedido) => {
      try {
        const result = await getConnection().query(`DELETE FROM loja.pedido WHERE id_pedido = ${id_pedido}`)
        return true
      } catch(err) {
        return false
        console.log("Error ao deletar pedido: "+err.code)
      }
  },

  pedidoSimplif: async () => {
    try {
      const result =  await getConnection().query(`SELECT * FROM loja.v_pedidos`)
      return result.recordset
    } catch(err) {
        console.log("Error ao visualizar os pedidos: "+err.code)
    }
  },

  pedidoSimplifID: async (id_pedido) => {
    try {
      const result = await getConnection().query(`SELECT * FROM loja.v_pedidos WHERE id_pedido = ${id_pedido}`)
      return result.recordset
    } catch(err) {
        console.log("Error ao visualizar o pedido: "+err.code)
    }
  },

  pedidoPendente: async () => {
    try {
      const result = await getConnection().query(`SELECT * FROM loja.v_pendentes`)
      return result.recordset 
    } catch(err) {
        console.log("Error ao selecionar os pedidos pendentes: " +err.code)
    }
  }
}