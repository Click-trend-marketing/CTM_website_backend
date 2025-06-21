const sendMail = require("../middleware/mail");
const axios = require("axios");
const path = require("path");

// Helper to capture payment from Razorpay


// Controller for sending mail after capturing payment and including PDF download link
const sendMailRoute = async (req, res) => {
    try {
        const { paymentId, amount, type, to, subject } = req.body;
        if (!paymentId || !type || !to || !subject) {
            return res.status(400).json({ message: "'paymentId', 'type', 'to', and 'subject' are required." });
        }
        // 2. Construct PDF download URL based on type
        const baseUrl = 'https://www.clicktrendmarketing.com';
        let pdfUrl = null;
        let downloadLabel = '';
        if (type === 'cripto') {
            pdfUrl = `${baseUrl}/uploads/pdf/cryptocurrency.pdf`;
            downloadLabel = 'Download PDF';
        } else if (type === 'master') {
            pdfUrl = `${baseUrl}/uploads/pdf/Facebook-Mastery.pdf`;
            downloadLabel = 'Download PDF';
        }

        // 3. Create email template with or without download link
        let mailBody = `
<div style="max-width:480px;margin:40px auto;padding:32px 24px;background:#fff;border-radius:12px;box-shadow:0 4px 24px rgba(0,0,0,0.08);font-family:'Segoe UI',Arial,sans-serif;">
  <div style="text-align:center;">
    <div style="font-size:32px;font-weight:800;color:#2a7be4;margin-bottom:16px;">Click Trend Marketing</div>
    <div style="font-size:28px;font-weight:700;color:#2a7be4;margin-bottom:8px;">Payment Successful</div>
    <div style="font-size:16px;color:#555;margin-bottom:24px;">Thank you for your payment!</div>
  </div>
  <div style="background:#f6f8fa;padding:16px 20px;border-radius:8px;margin-bottom:24px;">
    <div style="font-size:15px;color:#222;margin-bottom:8px;"><strong>Payment ID:</strong> ${paymentId}</div>
    <div style="font-size:15px;color:#222;margin-bottom:8px;"><strong>Type:</strong> ${type}</div>
  </div>
  <div style="text-align:center;margin-bottom:18px;">
    <span style='font-size:15px;color:#2a7be4;'>You can now take some of our exclusive PDF resources after your payment.</span>
  </div>
  <div style="text-align:center;">
    ${pdfUrl ? `<a href="${pdfUrl}" target="_blank" style="display:inline-block;padding:12px 32px;background:#2a7be4;color:#fff;font-size:16px;font-weight:600;text-decoration:none;border-radius:6px;box-shadow:0 2px 8px rgba(42,123,228,0.12);transition:background 0.2s;">${downloadLabel}</a>` : ''}
  </div>
  <div style="margin-top:32px;text-align:center;color:#888;font-size:13px;">
    If you have any questions, reply to this email.<br>
    &copy; ClickTrendMarketing.com
  </div>
</div>
`;

        // 4. Send email (no attachment, just link if applicable)
        const nodemailer = require("nodemailer");
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: 'sahilbansal09800@gmail.com',
                pass: 'epyfdyvvjxtfxthp'
            }
        });
        await transporter.sendMail({
            from: 'support@clicktrendmarketing.com',
            to,
            subject,
            html: mailBody
        });

        res.status(200).json({ message: "Email sent successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to process payment and send email." });
    }
};

module.exports = {
    sendMailRoute,
}; 