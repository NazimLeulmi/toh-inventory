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
  const { first_name, last_name, email, password } = req.body;
  const hash = await bcrypt.hash(password, 12);
  const userModel = new models.UserModel({
    first_name: first_name,
    last_name: last_name,
    email: email,
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
  const {
    processor_type, description, received_from,
    received_date, serial_number } = req.body;
  if (!isValid) return res.json({ isValid, errors });
  const processor = await models.ProcessorModel.findOne({ serial_number: serial_number })
    .catch(error => console.log(err));
  if (processor) return res.json({
    isValid: false,
    errors: { serial_number: "Duplicate serial number" }
  })
  const processorModel = new models.ProcessorModel({
    processor_type: processor_type,
    description: description,
    received_from: received_from,
    received_date: received_date,
    serial_number: serial_number,
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

app.post("/deliver", async (req, res) => {
  try {
    const updated = await models.ProcessorModel.findByIdAndUpdate(req.body.id, {
      delivery: {
        delivered: true,
        insurance: req.body.insurance.value,
        patient: req.body.patient,
        institution: req.body.institution,
        delivery_date: req.body.delivery_date,
        received_by: req.body.received_by,
        audiologist: req.body.audiologist.value,
        file_number: req.body.file_number,
        d_number: req.body.d_number,
        lpo: req.body.lpo,
        lpo_date: req.body.lpo_date,
        mrn: req.body.mrn,
      }
    })
    console.log(updated);
    return res.json({ success: true, processor: updated });
  } catch (err) { console.log(err) }
})

app.post("/update", async (req, res) => {
  try {
    const {
      processor_type, description, received_from,
      received_date, serial_number, delivery } = req.body;
    const { isValid, errors } = validation.validateProcessor(req.body);
    if (!isValid) return res.json({ isValid, errors });
    console.log(req.body);
    const processor = await models.ProcessorModel.findById(req.body._id);
    if (delivery === "NO") processor.delivery = { delivered: false };
    processor.processor_type = processor_type;
    processor.description = description;
    processor.received_from = received_from;
    processor.received_date = received_date;
    processor.serial_number = serial_number;
    const updated = await processor.save();
    return res.json({ success: true, processor: updated });
  } catch (err) { console.log(err) }
})

app.listen(8888, () => console.log("Node.js server running on port 8888"));