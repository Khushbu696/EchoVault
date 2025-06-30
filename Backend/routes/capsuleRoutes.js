const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { createCapsule, getUserCapsules, getCapsuleById, deleteCapsule } = require('../controllers/capsuleController');

router.post('/', protect, createCapsule);
router.get('/my', protect, getUserCapsules);
router.get('/:id', getCapsuleById);
router.delete('/:id', protect, deleteCapsule);

module.exports = router;
