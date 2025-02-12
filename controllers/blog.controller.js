const Blog = require("../models/blog.model");


const addBlogData = async (req, res) => {
    try {
        // Log request body and files for debugging
        console.log("Request Body:", req.body);
        console.log("Uploaded Files:", req.files);

        // Extract text fields from req.body
        const { title, content } = req.body;
        let { tags, published } = req.body;

        // Define Base URL Dynamically
        const localUrl = `${req.protocol}://${req.get("host")}/uploads/images/`;
        const liveUrl = process.env.LIVE_URL ? `${process.env.LIVE_URL}/uploads/images/` : localUrl;

        // Use live URL if available, otherwise fallback to local
        const baseUrl = process.env.NODE_ENV === "production" ? liveUrl : localUrl;

        // Extract and generate image URLs
        const featuredImage = req.files?.featuredImage ? `${baseUrl}${req.files.featuredImage[0].filename}` : null;
        const blogImages = req.files?.blogImages ? req.files.blogImages.map(file => `${baseUrl}${file.filename}`) : [];

        // Parse tags (Ensure it’s an array)
        tags = tags ? (Array.isArray(tags) ? tags : tags.split(",")) : [];

        // Parse published (Ensure it’s a boolean)
        published = published === "true" || published === true;

        // Check required fields
        if (!title || !featuredImage || !content) {
            return res.status(400).json({ statusCode: 400, message: "Title, Featured Image, and Content are required" });
        }

        // Create new Blog instance
        const newBlog = new Blog({
            title,
            featuredImage, // Store URL instead of filename
            blogImages, // Store array of image URLs
            content,
            tags,
            published
        });

        // Save the blog
        const savedBlog = await newBlog.save();
        return res.status(201).json({ message: "New blog entry added successfully", blog: savedBlog });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ statusCode: 500, message: "Could not add the blog data", error: error.message });
    }
};




// Update blog entry by ID
const updateBlogData = async (req, res) => {
    try {
        const { blogId } = req.params;
        const { title, featuredImage, content, blogImages, tags, published } = req.body;

        if (!blogId) {
            return res.status(400).json({ statusCode: 400, message: "Blog ID is required" });
        }

        const updateFields = {};
        if (title !== undefined) updateFields.title = title;
        if (featuredImage !== undefined) updateFields.featuredImage = featuredImage;
        if (content !== undefined) updateFields.content = content;
        if (blogImages !== undefined) updateFields.blogImages = blogImages;
        if (tags !== undefined) updateFields.tags = tags;
        if (published !== undefined) updateFields.published = published;

        const updatedBlog = await Blog.findByIdAndUpdate(blogId, updateFields, { new: true });

        if (!updatedBlog) {
            return res.status(404).json({ statusCode: 404, message: "Blog data not found" });
        }

        return res.status(200).json({ message: "Blog data updated successfully", blog: updatedBlog });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ statusCode: 500, message: "Internal server error", error: error.message });
    }
};

// Get all blog entries
const getBlogData = async (req, res) => {
    try {
        const blogs = await Blog.find();
        if (!blogs.length) {
            return res.status(404).json({ statusCode: 404, message: "No blog entries found" });
        }
        return res.status(200).json({ message: "Blog data retrieved successfully", blogs });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ statusCode: 500, message: "Could not retrieve the blog data", error: error.message });
    }
};

// Get blog entry by ID
const getBlogDataById = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findById(id);

        if (!blog) {
            return res.status(404).json({ statusCode: 404, message: "Blog data not found" });
        }
        return res.status(200).json({ message: "Blog data retrieved successfully", blog });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ statusCode: 500, message: "Could not retrieve the blog data", error: error.message });
    }
};

// Delete blog entry by ID
const deleteBlogById = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBlog = await Blog.findByIdAndDelete(id);

        if (!deletedBlog) {
            return res.status(404).json({ statusCode: 404, message: "Blog data not found" });
        }
        return res.status(200).json({ message: "Blog data deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ statusCode: 500, message: "Could not delete the blog data", error: error.message });
    }
};

module.exports = {
    addBlogData,
    updateBlogData,
    getBlogData,
    getBlogDataById,
    deleteBlogById,
};
