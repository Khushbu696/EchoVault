const cron = require('node-cron');
const Capsule = require('../models/Capsule');
const sendCapsuleEmail = require('./emailService');
const mongoose = require('mongoose');

// Runs every minute
const startScheduler = () => {
  cron.schedule('* * * * *', async () => {
    try {
      const now = new Date();

      // Find capsules due for delivery
      const capsules = await Capsule.find({
        unlockDate: { $lte: now },
        isUnlocked: false
      });

      for (const capsule of capsules) {
        await sendCapsuleEmail(capsule);
        capsule.isUnlocked = true;
        await capsule.save();
      }

      if (capsules.length > 0) {
        console.log(`[CRON] Sent ${capsules.length} capsule(s) at ${now.toISOString()}`);
      }

    } catch (error) {
      console.error('[CRON ERROR]', error);
    }
  });
};

module.exports = startScheduler;
