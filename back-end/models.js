const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
})
const processorSchema = new Schema({
    processorType: { type: String, required: true },
    description: { type: String, required: false },
    serialNumber: { type: String, required: true, unique: true },
    receivedFrom: { type: String, required: true },
    receivedDate: { type: Date, required: true },
    delivered: { type: Boolean, default: false },
    deliveredTo: { type: String },
    deliveredDate: { type: Date },
})

const UserModel = mongoose.model('User', userSchema);
const ProcessorModel = mongoose.model('Processor', processorSchema);


module.exports = { UserModel, ProcessorModel }
