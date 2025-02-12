const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    featuredImage: { type: String, required: true }, 
    blogImages: [{ type: String, required: false }], // Array to store multiple image URLs
    content: { type: String, required: true },
    tags: [{ type: String, required: false }], // Array to store multiple tags
    published: { type: Boolean, default: false },
}, 
 {
    timestamps: {  
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;

