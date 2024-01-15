require('dotenv').config()

/*
const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_BASE
})
*/
const express = require('express');
const app = express();

app.get('/', async (req, res) => {
    let conn;
  try {
    // rconn = await pool.getConnection();
    res.send("Hello World!");
  } catch (error) {
    res.status(500).send("An error occurred");
  } finally {
    if (conn) conn.release();
  }
});

app.listen(process.env.PORT, () => {
    console.log('Server is running on port ' + process.env.PORT);
});
