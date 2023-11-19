alter TRIGGER Loja.trUpdatePedido
    ON Loja.pedido
    FOR insert
AS 
BEGIN
    declare @quantidade int
    declare @produto int
    declare @estoque int
    declare @situacao char(1)
    select @quantidade = quantidade from inserted
    select @produto = produto from inserted
    select @estoque = estoque from loja.produto WHERE id_produto = @produto
    select @situacao = situacao from inserted

    IF @estoque = 0
    BEGIN
    ROLLBACK TRANSACTION
    RAISERROR('Produto esgotado!', 15, 1);
    END
    ELSE
    IF @estoque < @quantidade
    BEGIN 
    ROLLBACK TRANSACTION
    RAISERROR('Quantidade inválida!', 15, 1);
    END 
    ELSE 
    update Loja.produto
        set
            estoque = estoque - @quantidade
        where
            id_produto = @produto

    IF @situacao != 'C' and @situacao != 'P'
    BEGIN
	ROLLBACK TRANSACTION
	RAISERROR('situação inválida', 15, 1);
	END
    ELSE 
    print('pedido adicionado!')

END