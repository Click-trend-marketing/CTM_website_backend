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
    password : {
        type : String,
        default : null
    },
    subject: {
        type: String,
    },
    message: {
        type: String
    },
    projectsDone: {
        type: Number,
        default: 0
    },
    totalClients: {
        type: Number,
        default: 0
    },
    adminUpdatedEmail: {
        type: String,
        lowercase: true,
        trim: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'], 
        default: 'user'         
    }
},
 {
    timestamps: {  
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

// Correctly define and export the model
const User = mongoose.model('User', userSchema);

module.exports = User;
