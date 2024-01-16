const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

const login = async (req, res) => {
    const {email, password} = req.body;
    const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      })
      if (bcrypt.compareSync(password, user.password)) {
        res.status(201).send({
            token: generateAccessToken(email)
        });
    } else {
        res.status(401).send("Wrong password");
    }
}

const createUser = async (req, res) => {
    const {username, email, password} = req.body;
    const user = await prisma.user.create({
        data: {
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
        }
    })
    res.status(201).json({response : user, token : generateAccessToken(email)});
}

const updateUser = (req, res) => {

}

const deleteUser = (req, res) => {

}

const generateAccessToken = (email) => {
    const payload = { email }; // Créer un objet avec l'email
    return jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '86400s' });
};

module.exports = {
    createUser,
    updateUser,
    deleteUser,
    login,
};