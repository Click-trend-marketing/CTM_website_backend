const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: 'sahilbansal09800@gmail.com',
    pass: 'epyfdyvvjxtfxthp'
  }
});

// async..await is not allowed in global scope, must use a wrapper
async function sendMail(to, subject, body) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"ClickTrendMarketing.com" <support@clicktrendmarketing.com>', // sender address
    to: to, // list of receivers
    subject: subject, // Subject line
    text: subject, // plain text body
    html: body, // html body
  });
}

module.exports = sendMail