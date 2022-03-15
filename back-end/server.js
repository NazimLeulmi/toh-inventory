const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const validation = require('./validation');
const models = require('./models');
const bcrypt = require('bcrypt');
const session = require('express-session');

let app = express();

app.use(cors());
app.use(express.json());

app.use(session({
    secret: 'my very important session secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true, maxAge: 60000, sameSite: true }
}))
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

// app.post("/signup", async (req, res) => {
//     const { isValid, errors } = validation.validateSignUp(req.body);
//     if (!isValid) return res.json({ isValid, errors });
//     const hash = await bcrypt.hash(req.body.password, 12);
//     const userModel = new models.UserModel({
//         firstName: req.body.firstName,
//         lastName: req.body.lastName,
//         email: req.body.email,
//         password: hash
//     })
//     const userEntry = await userModel.save();
//     return res.json({ success: true })
// })

app.post("/processors", async (req, res) => {
    const { isValid, errors } = validation.validateProcessor(req.body);
    if (!isValid) return res.json({ isValid, errors });
    const processor = await models.ProcessorModel.findOne({ serial_number: req.body.serial_number })
        .catch(error => console.log(err));
    if (processor) return res.json({ isValid: false, errors: { serial_number: "Duplicate serial number" } })
    const processorModel = new models.ProcessorModel({
        processor_type: req.body.processor_type,
        description: req.body.description,
        receipt_from: req.body.receipt_from,
        receipt_date: req.body.receipt_date,
        serial_number: req.body.serial_number,
    })
    const processorEntry = await processorModel.save();
    return res.json({ success: true, processor: processorEntry })
})


app.listen(8888, () => console.log("Node.js server running on port 8888"));