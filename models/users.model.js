const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        required: true,
        lowercase: true
    },
    subject: {
        type: String,
    },
    message: {
        type: String
    }
}, {
    timestamps: {  
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

// Correctly define and export the model
const User = mongoose.model('User', userSchema);

module.exports = User;
