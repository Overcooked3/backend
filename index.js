require('dotenv').config()
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const express = require('express');

const app = express();

app.use(express.json());

app.get('/', async (req, res) => {
  // const users = await prisma.user.findMany();
  res.json({});
});

app.listen(process.env.PORT, () => {
  console.log('Server is running on port ' + process.env.PORT);
});
