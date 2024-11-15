const express = require("express");
const router = express.Router();
const UserController = require("../controllers/users.controller")


/**
 * @swagger
 * /api/form/create:
 *   post:
 *     tags:
 *       - User 
 *     summary: Create a user form
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: rishab
 *               email:
 *                 type: string
 *                 example: rishab@gmail.com
 *               subject:
 *                 type: string
 *                 example: hi there
 *               message:
 *                 type: string
 *                 example: This is a sample message.
 *             required:
 *               - name
 *               - email
 *               - subject
 *               - message
 *     responses:
 *       '201':
 *         description: Form created successfully
 *       '400':
 *         description: Bad Request
 *       '422':
 *         description: Validation Error
 *       '500':
 *         description: Internal Server Error
 */
router.post('/form/create', UserController.createForm);


/**
 * @swagger
 * /api/getUserData:
 *   get:
 *     tags:
 *       - User
 *     summary: Get user data
 *     description: Allows the admin to retrieve user data.
 *     responses:
 *       200:
 *         description: User data retrieved successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Could not retrieve the user data
 */
router.get('/getUserData', UserController.getUserData);


module.exports = router



