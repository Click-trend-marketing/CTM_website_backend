const mongoose = require('mongoose');

const ApplicantSchema = new mongoose.Schema({
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Career', default: null },
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
    resume: { type: String, default: null }, // File path of the resume
    appliedAt: { type: Date, default: Date.now }, // Timestamp of application

    // New fields
    address: {
        type: String,
        trim: true,
    },
    position: {
        type: String,
        trim: true,
    },
    experience: {
        type: Number,
        min: 0, // assuming experience is in years and cannot be negative
    },
    phoneNumber: {
        type: String,
        trim: true,
        required: true,
    },
    referralName: {
        type: String,
        trim: true,
    },
    referralNumber: {
        type: String,
        trim: true,
    },
    familyRelationName: {
        type: String,
        trim: true,
    },
    familyRelationNumber: {
        type: String,
        trim: true,
    },
    referredToUs: {
        type: String,
        trim: true,
    },

}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

// Correctly define and export the model
const Applicant  = mongoose.model('Applicant', ApplicantSchema );

module.exports = Applicant ;
