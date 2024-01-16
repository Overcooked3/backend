const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

const login = async (req, res) => {
    const {username, password} = req.body;
    try {
        const user = await prisma.user.findUnique({
            where: {
              username: username,
            },
          })
          if (bcrypt.compareSync(password, user.password)) {
            res.status(201).send({
                token: generateAccessToken(user.email)
            });
        } else {
            res.status(401).send("Wrong password");
        }
    }
    catch (err) {
        res.status(401).send("Wrong arguments");
    }
}

const createUser = async (req, res) => {
    const {username, email, password} = req.body;
    try {
        const user = await prisma.user.create({
            data: {
                username: username,
                email: email,
                password: bcrypt.hashSync(password, 10),
            }
        })
        res.status(201).json({response : "Connexion réussie", token : generateAccessToken(email)});
    }
    catch (err) {
        res.status(401).send("Wrong arguments");
    }
}

const updateUser = async (req, res) => {
    const {username, email, password} = req.body;
    try {
        const user = await prisma.user.update({
            where: {
                id: req.params.id,
            },
            data: {
                username: username,
                email: email
            }
        })
        res.status(201).json({response : "Informations mises a jour", token : generateAccessToken(email)});
    }
    catch (err) {
        res.status(400).send("Wrong arguments");
    }
}

const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await prisma.user.delete({
            where: {
                id: id,
            },
        })
        res.status(201).json({response : "Utilisateur supprimé"});
    }
    catch (err) {
        res.status(400).send("Wrong arguments");
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.status(201).json(users);
    }
    catch (err) {
        res.status(400).send("Wrong arguments");
    }
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
    getAllUsers,
};