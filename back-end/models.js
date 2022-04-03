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
    serial_number: { type: String, required: true, unique: true },
    received_from: { type: String, required: true },
    received_date: { type: String, required: true },
    delivery: {
        delivered: { type: Boolean, default: false },
        delivery_date: { type: String },
        insurance: { type: String },
        patient: { type: String },
        institution: { type: String },
        received_by: { type: String },
        audiologist: { type: String },
        // C1/C2 Insurance
        file_number: { type: String },
        d_number: { type: String },
        // C3/C4 Insurance
        lpo: { type: String },
        lpo_date: { type: String },
        mrn: { type: String }
    }
})

const UserModel = mongoose.model('User', userSchema);
const ProcessorModel = mongoose.model('Processor', processorSchema);


module.exports = { UserModel, ProcessorModel }
