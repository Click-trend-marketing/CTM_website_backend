const express = require('express');
const BlogController = require("../controllers/blog.controller");
const { jwtVerify, roleAuth } = require("../middleware/jwt");
const { uploadFiles, handleUploadError } = require("../middleware/fileUploading");

const router = express.Router();

/**
 * @swagger
 * /api/addBlogData:
 *   post:
 *     tags:
 *       - Blog
 *     summary: Add a new blog
 *     description: Allows an admin to add a new blog entry with an image upload.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               featuredImage:
 *                 type: string
 *                 format: binary
 *               content:
 *                 type: string
 *               slug:
 *                 type: string
 *               blogImages:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               published:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Blog entry added successfully
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Internal server error
 */
router.post('/addBlogData', jwtVerify, roleAuth('admin'), uploadFiles, handleUploadError, BlogController.addBlogData);

/**
 * @swagger
 * /api/updateBlogData/{blogId}:
 *   put:
 *     tags:
 *       - Blog
 *     summary: Update a blog entry
 *     description: Allows an admin to update an existing blog entry with new images.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: blogId
 *         in: path
 *         required: true
 *         description: Blog ID to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               featuredImage:
 *                 type: string
 *                 format: binary
 *               content:
 *                 type: string
 *               blogImages:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               published:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Blog updated successfully
 *       400:
 *         description: Invalid input or missing blog ID
 *       404:
 *         description: Blog not found
 *       500:
 *         description: Internal server error
 */
router.put('/updateBlogData/:blogId', jwtVerify, roleAuth('admin'), uploadFiles, handleUploadError, BlogController.updateBlogData);

/**
 * @swagger
 * /api/getBlogData:
 *   get:
 *     tags:
 *       - Blog
 *     summary: Get all blog entries
 *     description: Fetches all blog entries.
 *     responses:
 *       200:
 *         description: List of all blog entries
 *       404:
 *         description: No blog entries found
 *       500:
 *         description: Internal server error
 */
router.get('/getBlogData', BlogController.getBlogData);

/**
 * @swagger
 * /api/blog/{id}:
 *   get:
 *     tags:
 *       - Blog
 *     summary: Get a blog entry by ID
 *     description: Fetch a specific blog entry by its ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Blog ID to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Blog entry retrieved successfully
 *       404:
 *         description: Blog entry not found
 *       500:
 *         description: Internal server error
 */
router.get('/blog/:id', BlogController.getBlogDataById);

/**
 * @swagger
 * /api/blog/{id}:
 *   delete:
 *     tags:
 *       - Blog
 *     summary: Delete a blog entry
 *     description: Deletes a blog entry by ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Blog ID to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Blog entry deleted successfully
 *       404:
 *         description: Blog entry not found
 *       500:
 *         description: Internal server error
 */
router.delete('/blog/:id', jwtVerify, roleAuth('admin'), BlogController.deleteBlogById);

module.exports = router;
