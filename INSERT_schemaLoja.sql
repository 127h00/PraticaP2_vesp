INSERT INTO Loja.funcionario VALUES
    ('2306', 'a127c'),
    ('2303', 'aJobs'),
    ('2333', 'alf3u')

SELECT * FROM Loja.funcionario


INSERT INTO Loja.cliente VALUES
    ('44845640090', 'Mariana', 'Ribeiro', 'mariana2000@gmail.com', 'nEEfHqy', '59132698', 
    'Pajuçara', 'Rua Nossa Senhora Aparecida', '89', null),
    ('88349551020', 'Lavínia', 'Santana', 'lalasantana@gmail.com', 'MJXtxfH', '59050120', 
    'Quintas', 'Rua Guanabara', '108', 'Bloco D'),
    ('64181520005', 'Murilo', 'Ferraz', 'muril1988@icloud.com', 'A8YLzZk', '54250321', 
    'Cavaleiro', 'Travessa Eletricista José Alves Ribeiro', '54', null),
    ('27186816088', 'Lígia', 'Fernanda', 'Lligia5456@gmail.com', 'aqQgJpc', '76962239', 
    'Novo Cacoal', 'Rua Anel Viário', '23', null)

SELECT * FROM Loja.cliente 


INSERT INTO Loja.produto VALUES
	('000001', 'Regata candy', 32, 35.50, 
    'Regata branca estampada, 87% poliéster'),
    ('000002', 'Shorts jeans dirty black', 27, 113, 
    'Shorts jeans preto efeito desgastado'),
    ('000003', 'Vestido coconut', 16, 98.80, 
    'Vestido regata marrom queimado, 97% algodão'),
    ('000004', 'Shorts saia Polo Ralph Lauren', 12, 84.90, 
    'Shorts saia Polo Ralph Lauren azul marinho, 100% poliéster reciclado'),
    ('000005', 'Suéter Snoopy', 27, 68.45, 
    'Suéter branco estampado Snoopy'),
    ('000006', 'Cropped Miu Miu Club', 14, 42, 
    'Cropped branco estampado com deatalhes vermelhos'),
    ('000007', 'Jaqueta jeans Teddy', 28, 196, 
    'Jaqueta jeans azul, forro peludo macio branco')

SELECT * FROM Loja.produto 


INSERT INTO Loja.pedido VALUES
    ('44845640090', '000002', 1, 'G')
INSERT INTO Loja.pedido VALUES
    ('88349551020', '000004', 1, 'P')
INSERT INTO Loja.pedido VALUES
    ('64181520005', '000005', 2, 'M')

SELECT * FROM Loja.pedido
DELETE FROM loja.pedido WHERE cpf_c = '64181520005'