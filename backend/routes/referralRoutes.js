// routes/referralRoutes.js
const express = require('express');
const router = express.Router();
const { authenticateJWT, authorizeRoles } = require('../middleware/authMiddleware');
const { 
  referCase, 
  getMyHospitalReferrals, 
  updateReferral, 
  getReferralDetails 
} = require('../controllers/referralController');

// Admin / System can refer cases
router.post('/', authenticateJWT, authorizeRoles('admin'), referCase);

// Hospital staff can view their referrals
router.get('/my', authenticateJWT, authorizeRoles('hospital'), getMyHospitalReferrals);

// Update referral status (Hospital use)
router.put('/:id', authenticateJWT, authorizeRoles('hospital'), updateReferral);

// Get single referral details
router.get('/:id', authenticateJWT, getReferralDetails);

module.exports = router;