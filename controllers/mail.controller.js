const nodemailer = require("nodemailer");

// Controller for sending mail after capturing payment and including PDF download link
const sendMailRoute = async (req, res) => {
  try {
    const { paymentId, amount, type, to, subject } = req.body;

    if (!paymentId || !type || !to || !subject) {
      return res.status(400).json({
        message: "'paymentId', 'type', 'to', and 'subject' are required."
      });
    }

    // 1. Build the PDF download URL
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

    // 2. Build email HTML
    const mailBody = `
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
    <span style='font-size:15px;color:#2a7be4;'>You can now download your exclusive PDF resource.</span>
  </div>
  <div style="text-align:center;">
    ${pdfUrl ? `<a href="${pdfUrl}" target="_blank" style="display:inline-block;padding:12px 32px;background:#2a7be4;color:#fff;font-size:16px;font-weight:600;text-decoration:none;border-radius:6px;">${downloadLabel}</a>` : ''}
  </div>
  <div style="margin-top:32px;text-align:center;color:#888;font-size:13px;">
    If you have any questions, reply to this email.<br>
    &copy; ClickTrendMarketing.com
  </div>
</div>`;

    // 3. Plain text version
    const mailText = `Click Trend Marketing\n\nPayment Successful\n\nPayment ID: ${paymentId}\nType: ${type}\n${pdfUrl ? `Download: ${pdfUrl}` : ''}\n\nIf you have any questions, reply to this email.\n© ClickTrendMarketing.com`;

    // 4. Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'teamclicktrendmarketing@gmail.com',
        pass: 'tuof ytiq sjes smlj' // App Password
      }
    });

    // 5. Send the mail
    await transporter.sendMail({
      from: '"Click Trend Marketing" <teamclicktrendmarketing@gmail.com>', // must match SMTP domain
      to,
      subject,
      html: mailBody,
      text: mailText,
      replyTo: 'support@clicktrendmarketing.com',
      headers: {
        'X-Priority': '1',
        'X-Mailer': 'ClickTrendMailer',
        'Message-ID': `<${Date.now()}-${Math.random().toString(36).slice(2)}@clicktrendmarketing.com>`
      }
    });

    res.status(200).json({ message: "Email sent successfully." });
  } catch (error) {
    console.error("Mail error:", error);
    res.status(500).json({ message: "Failed to send email.", error: error.message });
  }
};

module.exports = {
  sendMailRoute
};
