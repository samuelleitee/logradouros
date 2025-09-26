const mongoose = require("mongoose");

const connectDatabase = () => {
    // URI e Propriedades de Conexão
    mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB Atlas Connected!"))
    .catch((error) => console.log(error));
};

module.exports = connectDatabase;