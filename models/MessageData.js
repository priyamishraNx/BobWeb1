const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    message: String
},{timestamps: true})

const MessageModal = mongoose.model('MessageModal', MessageSchema);

module.exports = MessageModal;
