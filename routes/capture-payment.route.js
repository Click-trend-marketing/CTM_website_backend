const express = require("express");
const router = express.Router();
const axios = require("axios");
const MailController = require("../controllers/mail.controller");

/**
 * @swagger
 * /api/capture-payment:
 *   post:
 *     tags:
 *       - Payment
 *     summary: Capture a Razorpay payment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               paymentId:
 *                 type: string
 *                 example: pay_QhoG0zm07n9MCA
 *               amount:
 *                 type: integer
 *                 example: 30000
 *             required:
 *               - paymentId
 *               - amount
 *     responses:
 *       200:
 *         description: Payment captured successfully
 *       500:
 *         description: Failed to capture payment
 */
router.post('/capture-payment', async (req, res) => {
  const { paymentId, amount } = req.body;
  const key_id = 'rzp_live_pjl8aG4DBFwONM';
  const key_secret = 'x1DoPFWIFes0r2sOop79lng1';

  try {
    const response = await axios.post(
      `https://api.razorpay.com/v1/payments/${paymentId}/capture`,
      { amount, currency: 'INR' },
      {
        auth: { username: key_id, password: key_secret },
        headers: { 'Content-Type': 'application/json' }
      }
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.response?.data || err.message });
  }
});

module.exports = router; 