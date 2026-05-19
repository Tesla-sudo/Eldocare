// routes/caseRoutes.js
const express = require('express');
const router = express.Router();
const { authenticateJWT, authorizeRoles } = require('../middleware/authMiddleware');
const { 
  createNewCase, 
  getMyCases, 
  getAllCasesAdmin, 
  getCaseDetails 
} = require('../controllers/caseController');

// Protected routes
router.post('/', authenticateJWT, createNewCase);
router.get('/me', authenticateJWT, getMyCases);
router.get('/:id', authenticateJWT, getCaseDetails);

// Admin only
router.get('/', authenticateJWT, authorizeRoles('admin'), getAllCasesAdmin);

module.exports = router;