const Capsule = require('../models/Capsule');

const createCapsule = async (req, res) => {
  const {
    title,
    message,
    mediaUrls,
    recipientEmail,
    unlockDate
  } = req.body;

  const uploadedMediaUrls = mediaUrls || [];

  try {
    const newCapsule = new Capsule({
      user: req.user._id,
      title,
      message,
      mediaUrls: uploadedMediaUrls,
      recipientEmail,
      unlockDate
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
    const capsules = await Capsule.find({ user: req.user._id }).sort({ unlockDate: -1 });
    res.status(200).json(capsules);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Failed to fetch capsules' });
  }
};

const getCapsuleById = async (req, res) => {
  try {
    const capsule = await Capsule.findById(req.params.id);
    if (!capsule) {
      return res.status(404).json({ message: 'Capsule not found' });
    }
    res.json(capsule); // No auth check
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
