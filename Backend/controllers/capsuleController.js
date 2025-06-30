const Capsule = require('../models/Capsule');

const createCapsule = async (req, res) => {
  const {
    title,
    message,
    mediaUrls, // Unused in this block
    recipientEmail,
    unlockDate,
    isPrivate,
    passcode,
  } = req.body;

  console.log("recipientEmail in req.body: ", recipientEmail);
  console.log(mediaUrls);
  const uploadedMediaUrls = mediaUrls || [];

  try {
    const newCapsule = new Capsule({
      user: req.user._id,
      title,
      message,
      mediaUrls: uploadedMediaUrls,
      recipientEmail,
      unlockDate,
      isPrivate,
      passcode,
    });

    await newCapsule.save();
    console.log('Sending email to:', newCapsule.recipientEmail);

    // Send the email
    const sendCapsuleEmail = require('../utils/emailService');
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    const capsuleLink = `${frontendUrl}/capsule/${newCapsule._id}`;

    await sendCapsuleEmail(newCapsule);

    res.status(201).json({ success: true, capsule: newCapsule });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

const getUserCapsules = async (req, res) => {
  try {
    // Fetch all capsules created by the logged-in user
    const capsules = await Capsule.find({ user: req.user._id }).sort({ unlockDate: -1 });

    // Return the list of capsules
    res.status(200).json(capsules);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Failed to fetch capsules' });
  }
};

const getCapsuleById = async (req, res) => {
  try {
    // console.log(req.params.id);
    const capsule = await Capsule.findById(req.params.id);
    // console.log(capsule);

    if (!capsule) {
      return res.status(404).json({ message: 'Capsule not found' });
    }

    if (capsule.isPrivate && (!req.user || capsule.user.toString() !== req.user.id)) {
      return res.status(403).json({ message: 'Not authorized to view this capsule' });
    }

    res.json(capsule);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteCapsule = async (req, res) => {
  try {
    const capsule = await Capsule.findById(req.params.id);

    if (!capsule) {
      return res.status(404).json({ message: 'Capsule not found' });
    }

    // Optional: Only allow the owner to delete
    if (capsule.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await capsule.deleteOne();
    res.json({ message: 'Capsule deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { createCapsule, getUserCapsules, getCapsuleById, deleteCapsule };
