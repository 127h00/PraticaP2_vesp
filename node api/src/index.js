const express = require('express'); // receber o pacote  express
const cors = require('cors');

const getConnectionDB = require('./database/connection');

getConnectionDB(); // chamando a função que conecta com o banco de dados
const app = express(); // criei a aplicação

app.use(express.json()); // informando que vou utilizar o bodyParser e vou usar a função json (para ele entender quando eu enviar uma requisição para a API com informações em json)
app.use(cors()); // pra todos ips poderem acessar

app.listen(3030, () => {  // porta que quero ouvir
  console.log('Servidor rodando na porta 3030');
});