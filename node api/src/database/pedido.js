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

  selecionarPorIdPed: async (id_pedido) => {
    try {
      const result = await getConnection().query(`SELECT * FROM loja.pedido WHERE id_pedido=${id_pedido}`)
      return result.recordset[0]
    } catch (error) {
      console.log("Error ao selecionar o pedido pelo id:"+error)
    }
  },

  fzrPedido: async (cpf_c, produto, quantidade, tamanho) => {
    try {
        await getConnection().query(`INSERT INTO Loja.pedido VALUES '${cpf_c}',
        '${produto}', ${quantidade}, '${tamanho}', 'P'`)
      return true
    } catch (error) {
      console.log("Error ao fazer pedido:"+error)
      return false
    }
  },

  atualizarPed: async (id_pedido, cpf_c, produto, quantidade, tamanho, situacao) => {
    try {
        await getConnection().query(`UPDATE loja.pedido SET cpf_c = '${cpf_c}', produto = '${produto}', quantidade = ${quantidade},
            tamanho = '${tamanho}', situacao = '${situacao}' WHERE id_pedido = '${id_pedido}'`)
        return true
    } catch(err) {
        console.log("Error ao atualizar pedido: "+err.code)
        return false
    }
  },

  deletarPed: async (id_pedido) => {
      try {
          await getConnection().query(`DELETE FROM loja.pedido WHERE id_pedido = ${id_pedido}`)
          return true
      } catch(err) {
          console.log("Error ao deletar pedido: "+err.code)
          return false
      }
  },

  pedidoSimplif: async () => {
    try {
        await getConnection().query(`SELECT * FROM loja.v_pedidos`)
        return true
    } catch(err) {
        console.log("Error ao visualizar os pedidos: "+err.code)
        return false
    }
  },

  pedidoSimplifID: async (id_pedido) => {
    try {
        await getConnection().query(`SELECT * FROM loja.v_pedidos WHERE id_pedido = ${id_pedido}`)
        return true
    } catch(err) {
        console.log("Error ao visualizar o pedido: "+err.code)
        return false
    }
  },

  pedidoPendente: async () => {
    try {
        await getConnection().query(`SELECT * FROM loja.v_pendentes`)
        return true 
    } catch(err) {
        console.log("Error ao selecionar os pedidos pendentes: " +err.code)
        return false
    }
  }
}