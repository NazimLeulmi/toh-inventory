const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    approved: { type: Boolean, default: false }
})
const processorSchema = new Schema({
    processorType: { type: String, required: true },
    description: { type: String, required: false },
    serialNumber: { type: String, required: true, unique: true },
    receivedFrom: { type: String, required: true },
    receivedDate: { type: Date, required: true },
    delivery: {
        delivered: { tpye: Boolean, default: false },
        deliveredTo: { type: String },
        deliveredDate: { type: Date },
    }
})

const UserModel = mongoose.model('User', userSchema);
const ProcessorModel = mongoose.model('Processor', processorSchema);


module.exports = { UserModel, ProcessorModel }
