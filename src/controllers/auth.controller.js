const authService = require("../services/auth.service");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await authService.loginService(email);
        const passwordIsValid = await bcrypt.compare(password, user.password);

        if (!user) {
            return res.status(400).send({message: "Invalid email or password."});
        };

        if (!passwordIsValid) {
            return res.status(400).send({message: "Invalid email or password."});
        };

        const token = authService.generateToken(user.id);

        res.send({token});
    } catch (error) {
        res.status(500).send({message: error.message})
    }
};

module.exports = { login };