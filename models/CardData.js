const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema({
    name: String,
    namelast: String,
    email: String,
    dob: String,
    mobile: Number,
    pin: Number,
    pan: Number,
    Nationality: String,
    messages: [String]
}, { timestamps: true })

const CardModal = mongoose.model('CardModel', CardSchema);

module.exports = CardModal;
