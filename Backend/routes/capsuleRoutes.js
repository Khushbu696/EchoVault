const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { createCapsule, getUserCapsules } = require('../controllers/capsuleController');
const upload = require('../middleware/uploadMiddleware'); // Import upload middleware

// Handle file uploads for capsule creation
router.post('/', protect, upload.array('mediaUrls'), createCapsule);

// Protect and get all user’s capsules
router.get('/my', protect, getUserCapsules);
router.post('/', protect, createCapsule);

module.exports = router;
