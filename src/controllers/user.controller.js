const User = require("../models/User");
const userService = require("../services/user.service");
const mongoose = require("mongoose");

const create = async (req, res) => {
    try {
        const {name, email, password} = req.body;

        if (!name || !email || !password) {
            res.status(400).send({message: "Submit all fields for registration"});
        };

        const user = await userService.createService(req.body);
        if (!user) {
            return res.status(404).send({message: "Error on user creation"})
        };
            
        res.status(201).send({
            message: "User created succesfully",
            user: {
                id: user._id,
                name,
                email, 
            }
        });
    } catch (error) {
        res.status(500).send({message: error.message});
    };
};

const findAll = async (req, res) => {
    try {
        const users = await userService.findAllService();

        if (users.length === 0) {
            return res.status(400).send({message: "There are no registered users."});
        };

        res.send(users);
    } catch (error) {
        res.status(500).send({message: error.message});
    };
};

const findById = async (req, res) => {
    try {
        const { user } = req;

        res.send(user);
    } catch (error) {
        res.status(500).send({message: error.message});
    };
};

const update = async (req, res) => {
    try {
        const {name, email, password} = req.body;

        if (!name && !email && !password) {
            res.status(400).send({message: "Submit at least one field for registration"})
        };

        const { id, user } = req;

        await userService.updateService(
            id, 
            name,
            password,
        );

        res.send({message: "User succesfully updated!"});
    } catch (error) {
        res.status(500).send({message: error.message});
    };
};

const deleteById = async (req, res) => {
   try {
        const { user } = req;

        const deletedUser = await userService.deleteById(user.id)

        res.status(200).json({message: "Usuário deletado com sucesso!", deletedUser})
    } catch (error) {
        res.status(500).send({message: error.message});
    };
}

const deleteAll = async (req, res) => {
    try {
        await userService.deleteAll()

        res.status(200).send({message: "Todos os usuários foram deletados com sucesso!"});
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}

module.exports = { create, findAll, findById, update, deleteById, deleteAll };