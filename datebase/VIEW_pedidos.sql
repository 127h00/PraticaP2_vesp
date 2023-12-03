alter view Loja.v_pedidos as
	select nome_produto as 'nome_do_produto', prenome + ' ' + sobrenome as 'nome_completo', id_pedido as 'id_pedido', quantidade, tamanho, situacao
	from Loja.produto, loja.cliente, loja.pedido
	where id_produto = produto and cpf = cpf_c;

select * from loja.v_pedidos 


alter view Loja.v_pendentes as 
	select nome_produto as 'nome_do_produto', prenome + ' ' + sobrenome as 'nome_completo', id_pedido as 'id_pedido', quantidade, tamanho, situacao
	from Loja.produto, loja.cliente, loja.pedido
	where id_produto = produto and cpf = cpf_c and situacao = 'P';

select * from Loja.v_pendentes


alter view Loja.v_baixoEstoque as 
	select id_produto as 'id', nome_produto as 'nome_do_produto', estoque
	from Loja.produto
	where estoque <= 5;

select * from loja.v_baixoEstoque


create view Loja.v_enderecos as
	select cpf, cep, bairro, rua, numero, complemento 
	from loja.cliente

select * from loja.v_enderecos