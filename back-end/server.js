const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const validation = require('./validation');
const models = require('./models');
const bcrypt = require('bcrypt');

let app = express();

app.use(cors());
app.use(express.json());

connectDB().catch(err => console.log(err));

async function connectDB() {
    await mongoose.connect('mongodb://localhost:27017/inventory');
    console.log("Connected to Mongo Database")
}

app.post("/signin", (req, res) => {
    // const { isValid, errors } = validation.validateSignIn(req.body);
    // if (!isValid) console.log(errors);
    return;
})

app.post("/signup", async (req, res) => {
    const { isValid, errors } = validation.validateSignUp(req.body);
    if (!isValid) return res.json({ isValid, errors });
    const hash = await bcrypt.hash(req.body.password, 12);
    const userModel = new models.UserModel({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash
    })
    const userEntry = await userModel.save();
    return res.json({ success: true })
})


app.listen(8888, () => console.log("Node.js server running on port 8888"));