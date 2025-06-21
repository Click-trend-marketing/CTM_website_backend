const express = require("express");
const router = express.Router();
const MailController = require("../controllers/mail.controller");

/**
 * @swagger
 * /api/send-mail:
 *   post:
 *     tags:
 *       - Mail
 *     summary: Send an email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               to:
 *                 type: string
 *                 example: example@domain.com
 *               subject:
 *                 type: string
 *                 example: Test Subject
 *               body:
 *                 type: string
 *                 example: <p>This is a test email.</p>
 *             required:
 *               - to
 *               - subject
 *               - body
 *     responses:
 *       '200':
 *         description: Email sent successfully
 *       '400':
 *         description: Bad Request
 *       '500':
 *         description: Failed to send email
 */
router.post('/send-mail', MailController.sendMailRoute);

module.exports = router; 