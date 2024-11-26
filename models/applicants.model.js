const mongoose = require('mongoose');

const ApplicantSchema  = new mongoose.Schema({
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Career', required: true },
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
    resume: { type: String, required: true }, // File path of the resume
    appliedAt: { type: Date, default: Date.now }, // Timestamp of applicati
},
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    });

// Correctly define and export the model
const Applicant  = mongoose.model('Applicant', ApplicantSchema );

module.exports = Applicant ;
