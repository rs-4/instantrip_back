const nodemailer = require("nodemailer");

const sendEmail = async (mail, subject, text, html) => {

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'instantrip75@gmail.com',
      pass: 'lsoykdctvmcgxvng'
    }
  });

  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("SMTP Server is ready");
    }
  });

  let info = await transporter.sendMail({
    from: process.env.ADMIN_EMAIL,
    to: mail, 
    subject: subject,
    text: text, 
    html: html
  });

  return info;

}

module.exports = sendEmail;