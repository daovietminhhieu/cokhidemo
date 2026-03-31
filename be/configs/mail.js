const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "truonghp132@gmail.com",
    pass: "hdjqvcihugnjaiux",
  },
});

const sendEmailWithSMTP = async ({ to, subject, html }) => {
  try {
    const info = await transporter.sendMail({
      from: `admin" <truonghp132@gmail.com>`,
      to,
      subject,
      html,
    });

    console.log("Email sent:", info.messageId);
  } catch (error) {
    console.error("Send mail error:", error);
  }
};

module.exports = { sendEmailWithSMTP };