const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    googleId: { type: String },

});


module.exports = mongoose.model('User', userSchema);

