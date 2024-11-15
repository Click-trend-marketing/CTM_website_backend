const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  
    projectsDone: {
        type: Number,
        default: 0
    },
    totalClients: {
        type: Number,
        default: 0
    },
    phone: {
        type: String,
    },
    adminUpdatedEmail: {
        type: String,
        lowercase: true,
        trim: true
    },
    address: {
        type: String,
    },
},
 {
    timestamps: {  
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

const Content = mongoose.model('Content', contentSchema);

module.exports = Content;
