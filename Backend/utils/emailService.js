const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendCapsuleEmail = async (capsule) => {
  console.log(capsule);
  const capsuleLink = `https://echovault-frontend.netlify.app/capsule/${capsule._id}`; //forntend deployed url 
  const passcodeText = capsule.isPrivate
    ? `<p><strong>Security Code:</strong> ${capsule.passcode}</p>`
    : '';

  const mailOptions = {
    from: `"EchoVault" <${process.env.EMAIL_USER}>`,
    to: capsule.recipientEmail,
    subject: `🎁 A Time Capsule Has Arrived!`,
    html: `
      <h2>Hello,</h2>
      <p>You have received a time capsule!</p>
      <p><a href="${capsuleLink}">Click here to view it</a></p>
      ${passcodeText}
      <p>Sent via <strong>EchoVault</strong>.</p>
    `
  };

  await transporter.sendMail(mailOptions);
};

module.exports =  sendCapsuleEmail ;
