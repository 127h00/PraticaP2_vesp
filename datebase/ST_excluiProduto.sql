CREATE OR ALTER PROCEDURE Loja.spExcluiProduto
    @idProduto char(6)
AS
BEGIN
    DELETE FROM Loja.pedido WHERE produto = @idProduto
    DELETE FROM Loja.produto WHERE id_produto = @idProduto
END