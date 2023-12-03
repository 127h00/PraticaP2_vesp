const express = require('express'); // receber o pacote  express
const cors = require('cors');

const getConnectionDB = require('./database/connection');
const clienteRouter = require('./routes/cliente');
const funcionarioRouter = require('./routes/funcionario');
const pedidoRouter = require('./routes/pedido');
const produtoRouter = require('./routes/produto');
const log = require('./middleware/log');

getConnectionDB(); // chamando a função que conecta com o banco de dados
const app = express(); // criei a aplicação

app.use(express.json()); // informando que vou utilizar o bodyParser e vou usar a função json (para ele entender quando eu enviar uma requisição para a API com informações em json)
app.use(cors()); // pra todos ips poderem acessar

app.use(log)

app.use('/client', clienteRouter); // informando que vou usar as rotas de cliente
app.use('/employee', funcionarioRouter); // informando que vou usar as rotas de funcionario
app.use('/order', pedidoRouter); // informando que vou usar as rotas de pedido
app.use('/product', produtoRouter); // informando que vou usar as rotas de produto

app.use('/*', (req, res) => {
  res.status(404).send(`
    <h1>API ERROR 404</h1>
    <p>A rota ${req.originalUrl} em ${req.method} não existe!</p>
  `);
})

app.listen(3030, () => {  // porta que quero ouvir
  console.log('Servidor rodando na porta 3030');
});