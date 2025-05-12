const cron = require('node-cron');
const Capsule = require('../models/Capsule');
const nodemailer = require('nodemailer');

// Setup email transporter (use real credentials later)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // your Gmail address
    pass: process.env.EMAIL_PASS, // your app password
  },
});

// Run every minute (for testing)
const scheduleUnlocks = () => {
  cron.schedule('* * * * *', async () => {
    const now = new Date();

    try {
      const capsules = await Capsule.find({
        unlockDate: { $lte: now },
        isUnlocked: false,
      });

      for (const capsule of capsules) {
        capsule.isUnlocked = true;
        await capsule.save();

        // Send email
        await transporter.sendMail({
          from: `"EchoVault" <${process.env.EMAIL_USER}>`,
          to: capsule.recipientEmail,
          subject: `⏳ Your Time Capsule from "${capsule.title}" is Unlocked!`,
          html: `
            <p>Hey there!</p>
            <p>You have a message from the past:</p>
            <blockquote>${capsule.message}</blockquote>
            <p><strong>Unlocked on:</strong> ${new Date().toDateString()}</p>
            <p>Visit <a href="https://your-app-url.com">EchoVault</a> to view full details.</p>
          `,
        });

        console.log(`📬 Sent email for capsule: ${capsule._id}`);
      }
    } catch (error) {
      console.error('Error in scheduler:', error);
    }
  });
};

module.exports = scheduleUnlocks;
