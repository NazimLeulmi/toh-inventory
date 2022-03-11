const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');



let app = express();

app.use(cors());
app.use(express.json());

connectDB().catch(err => console.log(err));

async function connectDB() {
    await mongoose.connect('mongodb://localhost:27017/inventory');
    console.log("Connected to Mongo Database")
}

app.post("/signin", (req, res) => {
    console.log("SignIn route");
    console.log(req.body);
    return;
})

app.post("/signup", (req, res) => {
    console.log("SignUp route");
    console.log(req.body);
    return;
})


app.listen(8888, () => console.log("Node.js server running on port 8888"));