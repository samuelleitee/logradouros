const userService = require("../services/user.service");
const mongoose = require("mongoose");

const create = async (req, res) => {
    try {
        const {name, username, email, password, avatar, background} = req.body;

        if (!name || !username || !email || !password || !avatar || !background) {
            res.status(400).send({message: "Submit all fields for registration"});
        };

        const user = await userService.createService(req.body);
        if (!user) {
            return res.status(404).send({message: "Error on user creation"})
        };
            
        res.status(201).send({
            message: "User created succesfully",
            user: {
                user: user._id,
                name,
                username,
                email, 
                avatar,
                background
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
        const {name, username, email, password, avatar, background} = req.body;

        if (!name && !username && !email && !password && !avatar && !background) {
            res.status(400).send({message: "Submit at least one field for registration"})
        };

        const { id, user } = req;

        await userService.updateService(
            id, 
            name,
            username,
            password,
            avatar,
            background
        );

        res.send({message: "User succesfully updated!"});
    } catch (error) {
        res.status(500).send({message: error.message});
    };
};

module.exports = { create, findAll, findById, update };