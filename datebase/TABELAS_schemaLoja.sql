alter schema Loja

create table Loja.funcionario (
    id_funcionario CHAR(4) NOT NULL PRIMARY KEY,
    senha VARCHAR(30) NOT NULL
)

DROP TABLE Loja.funcionario
SELECT * FROM Loja.funcionario


create table Loja.cliente (
    cpf char(11) NOT NULL PRIMARY KEY,
    prenome varchar(20) NOT NULL,
    sobrenome varchar(50) NOT NULL,
    email varchar(50) UNIQUE NOT NULL,
    senha varchar(30) NOT NULL,
    cep char(8) NOT NULL,
    bairro varchar(60) NOT NULL,
    rua varchar(60) NOT NULL,
    numero varchar(3) NOT NULL,
    complemento varchar(70)
)

DROP TABLE Loja.cliente
SELECT * FROM Loja.cliente 


create table Loja.produto (
    id_produto char(6) NOT NULL PRIMARY KEY,
    nome_produto varchar(60) NOT NULL,
    estoque INT NOT NULL,
    preco varchar(8) NOT NULL,
    descricao varchar(400) NOT NULL
)

DROP TABLE Loja.produto
SELECT * FROM Loja.produto


create table Loja.pedido (
    id_pedido INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    cpf_c CHAR(11) NOT NULL FOREIGN KEY REFERENCES Loja.cliente(cpf),
    produto CHAR(6) NOT NULL FOREIGN KEY REFERENCES Loja.produto(id_produto),
    quantidade INT NOT NULL,
    tamanho varchar(2) NOT NULL,
    situacao CHAR(1) NOT NULL
)
-- situação: P (pendente) ou C (concluído)

DROP TABLE Loja.pedido
SELECT * FROM Loja.pedido