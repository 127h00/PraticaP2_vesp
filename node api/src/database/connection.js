var config = require("./dbconfig");
const sql = require("mssql");

let connectionDB = null;

async function getConnection() {
  if(connectionDB != null && connectionDB.connected)
    return connection;

  console.log("sql server conectando...");
  return await sql.connect(config).then(connection => {
      console.log("sql server conectado!");
      connectionDB = connection;
      return connection;
  }).catch(err => {
      console.log("ERRO in sql server: " + err);
  })
}

module.exports = getConnection;