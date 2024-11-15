const express = require('express');
const CareerController = require("../controllers/career.controller");
const router = express.Router();
const {jwtVerify, roleAuth} = require("../middleware/jwt")

// This route is to add career data

/**
 * @swagger
 * /api/addCareerData:
 *   post:
 *     tags: 
 *       - Career
 *     summary: Add a new career entry
 *     description: Allows the admin to add a new career entry.
 *     security:
 *      - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               position:
 *                 type: string
 *               experience:
 *                 type: string
 *               requirements:
 *                 type: array
 *                 items:
 *                   type: string
 *               location:
 *                 type: string
 *     responses:
 *       201:
 *         description: New career entry added successfully
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Could not add the career data
 */
router.post('/addCareerData', jwtVerify, roleAuth('admin'), CareerController.addCareerData);

// This route is to update career data

/**
 * @swagger
 * /api/updateCareerData:
 *   put:
 *     tags:
 *       - Career
 *     summary: Admin updates the user career data
 *     description: Allows the admin to update specific user career-related information.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               position:
 *                 type: string
 *                 example: "Software Engineer"
 *               experience:
 *                 type: string
 *                 example: "3+ years"
 *               requirements:
 *                 type: string
 *                 example: "Knowledge of Node.js"
 *               location:
 *                 type: string
 *                 example: "Mohali"
 *     responses:
 *       200:
 *         description: User data updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.put('/updateCareerData', jwtVerify, roleAuth('admin'), CareerController.updateCareerData);

// This route is to get career data

/**
 * @swagger
 * /api/getCareerData:
 *   get:
 *     tags:
 *       - Career
 *     summary: Get career data
 *     description: Allows the admin to retrieve user data.
 *     responses:
 *       200:
 *         description: User data retrieved successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Could not retrieve the user data
 */
router.get('/getCareerData', CareerController.getCareerData);

// This route is to get career data By id 

/**
 * @swagger
 * /api/career/{id}:
 *   get:
 *     tags:
 *       - Career
 *     summary: Retrieve Career Data by ID
 *     description: Fetches career data for a given ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Career ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Career data retrieved successfully.
 *       404:
 *         description: Career data not found.
 *       400:
 *         description: Invalid request.
 */
router.get('/career/:id', CareerController.getCareerDataById);


/**
 * @swagger
 * /api/career/{id}:
 *   delete:
 *     tags:
 *       - Career
 *     summary: Delete Career Data by ID
 *     description: Deletes career data for the specified ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Career ID to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Career data deleted successfully.
 *       404:
 *         description: Career data not found.
 *       400:
 *         description: Invalid request.
 */
router.delete('/career/:id', jwtVerify, roleAuth('admin'), CareerController.deleteCareerById);


module.exports = router;