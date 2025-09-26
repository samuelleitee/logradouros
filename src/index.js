const express = require("express");
const app = express();
const connectDatabase = require("./database/db")
const dotenv = require("dotenv");

const userRoute = require("./routes/user.route");
const authRoute = require("./routes/auth.route");
// const swaggerRoute = require("./routes/swagger.route");

dotenv.config();
connectDatabase();
app.use(express.json());

app.use("/user", userRoute);
app.use("/auth", authRoute);
// app.use("/doc", swaggerRoute);

app.get("/", (req, res) => res.status(200).send({message: "API WORKING"}))

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port ${port}`));