
  const sqlConfig = {
  user: process.env.DBUSER,
  password: process.env.DBPWD,
  database: process.env.DBNAME,
  server: process.env.DBSV,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: false, 
    trustServerCertificate: false 
  }
}

module.exports = {sqlConfig}
