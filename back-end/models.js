const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    approved: { type: Boolean, default: false }
})
const processorSchema = new Schema({
    processor_type: { type: String, required: true },
    description: { type: String, required: false },
    serial_number: { type: Number, required: true, unique: true },
    receipt_from: { type: String, required: true },
    receipt_date: { type: String, required: true },
    delivery: {
        delivered: { type: Boolean, default: false },
        delivered_to: { type: String, default: null },
        delivered_date: { type: String, default: null },
    }
})

const UserModel = mongoose.model('User', userSchema);
const ProcessorModel = mongoose.model('Processor', processorSchema);


module.exports = { UserModel, ProcessorModel }
