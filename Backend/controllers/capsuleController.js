const cloudinary = require('../utils/cloudinaryConfig');
const Capsule = require('../models/Capsule');

// @desc    Create a new time capsule
// @route   POST /api/capsules
// @access  Private
const createCapsule = async (req, res) => {
  const {
    title,
    message,
    mediaUrls, // For storing uploaded media
    recipientEmail,
    unlockDate,
    isPrivate,
    passcode,
  } = req.body;

  let uploadedMediaUrls = [];

  // If media files are uploaded, upload to Cloudinary
  if (req.files) {
    for (let file of req.files) {
      try {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: 'EchoVault/capsules',
        });
        uploadedMediaUrls.push(result.secure_url);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: 'Failed to upload media' });
      }
    }
  }

  try {
    const newCapsule = new Capsule({
      user: req.user._id,
      title,
      message,
      mediaUrls: uploadedMediaUrls, // Set the uploaded media URLs
      recipientEmail,
      unlockDate,
      isPrivate,
      passcode,
    });

    await newCapsule.save();
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

module.exports = { createCapsule, getUserCapsules };
