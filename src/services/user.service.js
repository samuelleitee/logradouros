const User = require("../models/User");

const createService = (body) => User.create(body);
const findAllService = () => User.find();
const findByIdService = (id) => User.findById(id); 
const updateService = (id, name, username, email, password, avatar, background) => User.findOneAndUpdate({_id: id}, {name, username, email, password, avatar, background});
const deleteAll = () => User.deleteMany({})
const deleteById = (id) => User.findByIdAndDelete(id)

module.exports = {
    createService, findAllService, findByIdService, updateService, deleteAll, deleteById
};