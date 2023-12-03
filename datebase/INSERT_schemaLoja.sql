INSERT INTO Loja.funcionario VALUES
    ('2306', 'Anna Clara Ferraz', 'a127c'),
    ('2303','Ana Luiza Job', 'aJobs'),
    ('2333', 'Thiago Carvalho', 'alf3u')

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
	('000001', 'Baby tee USA', 32, 43.50, 
    'Baby tee estampa guitarra U.S.A branca, 100% algodão'),
    ('000002', 'Jaqueta vermelha', 27, 110.30, 
    'Jaqueta vermelho escuro, couro artificial'),
    ('000003', 'Mini saia preta', 16, 47.80, 
    'Mini saia preta jeans'),
    ('000004', 'Blusa moletom branca', 12, 84.90, 
    'Blusa moletom branca com zíper estampa azul'),
    ('000005', 'Calça jogger', 27, 68.45, 
    'Calça jogger verde militar em sarja'),
    ('000006', 'Regata branca', 14, 31.90, 
    'Regata branca masculina, 100% algodão'),
    ('000007', 'Calça jeans oversized', 28, 157, 
    'Calça jeans azul escuro estilo oversized'),
    ('000008', 'Jaqueta preta', 30, 132, 
    'Jaqueta preta, 61% algodão, 34% viscose e 5% elastano'),
    ('000009', 'Calça jeans wide leg', 25, 146, 
    'Calça jeans azul claro estilo wide leg com rasgos')

SELECT * FROM Loja.produto 
delete from loja.produto where id_produto = '000010'
INSERT INTO loja.produto (id_produto, nome_produto, estoque, preco, descricao) VALUES  ('000009', 'Calça jeans wide leg', 25, 146, 
    'Calça jeans azul claro estilo wide leg com rasgos')

INSERT INTO Loja.pedido VALUES
    ('44845640090', '000002', 1, 'G', 'P')
INSERT INTO Loja.pedido VALUES
    ('88349551020', '000004', 1, 'P', 'P')
INSERT INTO Loja.pedido VALUES
    ('64181520005', '000005', 2, 'M', 'C')
    
SELECT * FROM Loja.pedido