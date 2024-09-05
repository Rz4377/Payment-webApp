const dotenv = require('dotenv')
dotenv.config();
const express = require('express')
const userRouter = require('./routes/users');
const accountRouter = require('./routes/account');
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json())

app.use("/api/v1/user", userRouter);
app.use("/api/v1/account",accountRouter);

app.listen(3000)
