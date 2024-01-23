require('dotenv').config()
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const express = require('express');

const app = express();
const userRoutes = require('./routes/userRoutes');

app.use(express.json());
app.use('/users', userRoutes);

app.listen(process.env.PORT, () => {
  console.log('Server is running on port ' + process.env.PORT);
});

module.exports = app;
