const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const userService = require("../services/user.service");

dotenv.config();

const authMiddleware = (req, res, next) => {
    const { authorization } = req.headers;
    
    if(!authorization) {
        return res.status(401).send({ message: "Authorization header missing or invalid" });
    };
        
    const parts = authorization.split(" ");
    if (parts.length !== 2) {
        return res.status(401).send({ message: "Missing two parts of authorization header" });
    };

    const [ schema, token ] = parts;
    if (schema !== "Bearer") {
        return res.status(401).send({ message: "Missing Bearer" });;
    }

    jwt.verify(token, process.env.SECRET_JWT, async (error, decoded) => {
        try {

            if (error) {
                return res.status(401).send({message: "Invalid Token"});
            };

            const user = await userService.findByIdService(decoded.id);
            
            if(!user || !user.id) {
                return res.status(401).send({message: "Invalid Token"});
            };
            
            req.id = user.id;

            return next();
        } catch (error) {
            res.status(500).send(error.message);
        };
    });
};

module.exports = { authMiddleware }