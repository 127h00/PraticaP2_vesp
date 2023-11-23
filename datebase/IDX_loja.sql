CREATE INDEX idxIdFunc
ON loja.funcionario(id_funcionario)

CREATE INDEX idxCpfCliente
ON loja.cliente(cpf)

CREATE INDEX idxIdProd
ON loja.produto(id_produto)

CREATE INDEX idxIdPedido
ON loja.pedido(id_pedido)

CREATE INDEX idxCpfClienteFK
ON loja.pedido(cpf_c)

CREATE INDEX idxIdProdFK
ON loja.pedido(produto)

CREATE INDEX idxSituacao
ON loja.pedido(situacao)