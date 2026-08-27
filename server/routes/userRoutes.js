const express = require('express');
const router = express.Router();
const {
  getWishlist,
  toggleWishlist,
  updateUserProfile
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.get('/wishlist', protect, getWishlist);
router.post('/wishlist/:productId', protect, toggleWishlist);
router.put('/profile', protect, updateUserProfile);

module.exports = router;
