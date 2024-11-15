const mongoose = require('mongoose');

const careerSchema = new mongoose.Schema({
  
    position: { type: String, required: true },
    experience : { type: String, required: true },
    requirements: [{ type: String, required: true }],
    location: { type: String, default: "Mohali" },
},
 {
    timestamps: {  
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

const Career = mongoose.model('Career', careerSchema);

module.exports = Career;





