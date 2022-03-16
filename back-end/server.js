const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const validation = require('./validation');
const models = require('./models');
const bcrypt = require('bcrypt');
const session = require('express-session');

let app = express();


app.use(cors({
  origin: ["http://localhost:8888", "http://localhost:3000"],
  credentials: true
}));
app.use(express.json());

app.use(session({
  secret: 'my very important session secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 1000 * 60 * 60 * 8 }
}))

// Mongo Database Connection
connectDB().catch(err => console.log(err));
async function connectDB() {
  await mongoose.connect('mongodb://localhost:27017/inventory');
  console.log("Connected to Mongo Database")
}

app.post("/signin", async (req, res) => {
  const { isValid, errors } = validation.validateSignIn(req.body);
  if (!isValid) return res.json({ isValid: false, errors });
  const user = await models.UserModel.findOne({ email: req.body.email })
    .catch(err => console.log(err));
  if (!user) return res.json({ isValid: false, errors: { email: "The user doesn't exist" } });
  const isCorrect = await bcrypt.compare(req.body.password, user.password);
  if (!isCorrect) return res.json({ isValid: false, errors: { password: "The password is invalid" } });
  // The user login data is correct
  req.session.userId = user._id;
  req.session.firstName = user.first_name;
  req.session.lastName = user.last_name;
  req.session.email = user.email;
  return res.json({
    success: true, user: {
      id: user._id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email
    }
  });
})

app.post("/signup", async (req, res) => {
  const { isValid, errors } = validation.validateSignUp(req.body);
  if (!isValid) return res.json({ isValid, errors });
  const hash = await bcrypt.hash(req.body.password, 12);
  const userModel = new models.UserModel({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: hash,
  })
  const userEntry = await userModel.save().catch(err => console.log(err));
  return res.json({ success: true })
})

app.get("/check-auth", async (req, res) => {
  if (req.session.userId) {
    console.log("User signed in");
    const user = await models.UserModel.findById(req.session.userId)
      .catch(err => console.log(err));
    if (!user) return res.json({ success: false });
    return res.json({
      success: true, user: {
        id: user._id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email
      }
    });
  } else {
    console.log("User NOT signed in");
    return res.json({ success: false })
  }
})

app.post("/signout", async (req, res) => {
  req.session.destroy(err => {
    if (err) return res.json({ success: false })
    else return res.json({ success: true })
  });
})

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

app.get("/processors", async (req, res) => {
  try {
    const processors = await models.ProcessorModel.find();
    return res.json({ processors });
  } catch (err) { console.log(err) }
})


app.listen(8888, () => console.log("Node.js server running on port 8888"));