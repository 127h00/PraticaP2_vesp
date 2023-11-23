alter view Loja.pedidos as
	select nome_produto as 'nome do produto', prenome + ' ' + sobrenome as 'nome completo', id_pedido as 'id pedido', quantidade, tamanho, situacao
	from Loja.produto, loja.cliente, loja.pedido
	where id_produto = produto and cpf = cpf_c;

select * from loja.pedidos


create view Loja.v_pendentes as 
	select nome_produto as 'nome do produto', prenome + ' ' + sobrenome as 'nome completo', id_pedido as 'id pedido', quantidade, tamanho, situacao
	from Loja.produto, loja.cliente, loja.pedido
	where id_produto = produto and cpf = cpf_c and situacao = 'P';

select * from Loja.pendentes


create view Loja.v_baixoEstoque as 
	select id_produto as 'id', nome_produto as 'nome do produto', estoque
	from Loja.produto
	where estoque <= 5;

select * from loja.baixoEstoque

create view Loja.enderecos as
	select cpf, cep, bairro, rua, numero, complemento 
	from loja.cliente

select * from loja.enderecos 