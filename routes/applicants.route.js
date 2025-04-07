const express = require("express");
const ApplicantsController = require("../controllers/applicants.controller");
const {
  uploadFiles,
  handleUploadError,
} = require("../middleware/fileUploading");
const router = express.Router();

/**
 * @swagger
 * /api/applyForJob:
 *   post:
 *     summary: Apply for a job
 *     description: Allows a user to apply for a job by submitting their details and uploading a resume.
 *     tags:
 *       - Job Applications
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the applicant
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 description: Email of the applicant
 *                 example: john.doe@example.com
 *               jobId:
 *                 type: string
 *                 description: ID of the job being applied for
 *                 example: 64a6b9f5c87b3c001c8b4567
 *               resume:
 *                 type: string
 *                 format: binary
 *                 description: Resume file to upload
 *     responses:
 *       201:
 *         description: Application submitted successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Job not found
 *       500:
 *         description: Internal server error
 */
router.post(
  "/applyForJob",
  uploadFiles,
  handleUploadError,
  ApplicantsController.applyForJob
);

/**
 * @swagger
 * /api/getApplicants:
 *   get:
 *     summary: Get a list of all applicants with their job details
 *     description: Retrieve a list of applicants along with the job details they applied for.
 *     tags:
 *       - Job Applications
 *     responses:
 *       200:
 *         description: Applicants retrieved successfully
 *       404:
 *         description: No applicants found
 *       500:
 *         description: Internal server error
 */
router.get("/getApplicants", ApplicantsController.getApplicants);

/**
 * @swagger
 * /api/joiningForm:
 *   post:
 *     summary: Submit a job application
 *     description: Accepts the details of a job applicant and submits the application.
 *     tags:
 *       - Job Applications
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               address:
 *                 type: string
 *               position:
 *                 type: string
 *               experience:
 *                 type: integer
 *                 example: 5
 *               relation:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               referralName:
 *                 type: string
 *               referralNumber:
 *                 type: string
 *               familyRelationName:
 *                 type: string
 *               familyRelationNumber:
 *                 type: string
 *               referredToUs:
 *                 type: string
 *     responses:
 *       201:
 *         description: Application submitted successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Job not found
 *       500:
 *         description: Internal server error
 */
router.post("/joiningForm", ApplicantsController.joiningForm);

/**
 * @swagger
 * /api/getJoining:
 *   get:
 *     summary: Get a list of all applicants with their job details
 *     description: Retrieve a list of applicants along with the job details they applied for.
 *     tags:
 *       - Job Applications
 *     responses:
 *       200:
 *         description: Applicants retrieved successfully
 *       404:
 *         description: No applicants found
 *       500:
 *         description: Internal server error
 */
router.get("/getJoining", ApplicantsController.getJoining);

/**
 * @swagger
 * /api/deleteApplicant/{id}:
 *   delete:
 *     summary: Delete an applicant by ID
 *     description: Remove an applicant from the database using their unique ID.
 *     tags:
 *       - Job Applications
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the applicant to be deleted
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Applicant deleted successfully
 *       404:
 *         description: Applicant not found
 *       400:
 *         description: Bad request or error occurred
 */
router.delete("/deleteApplicant/:id", ApplicantsController.deleteApplicant);

module.exports = router;
