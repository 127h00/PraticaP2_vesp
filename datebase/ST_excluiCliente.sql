CREATE OR ALTER PROCEDURE Loja.spExcluiCliente
    @cpf char(11)
AS
BEGIN
    DELETE FROM Loja.pedido WHERE cpf_c = @cpf
    DELETE FROM Loja.cliente WHERE cpf = @cpf
END