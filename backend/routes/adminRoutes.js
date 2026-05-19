// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const { authenticateJWT, authorizeRoles } = require('../middleware/authMiddleware');
const { 
  getDashboardOverview,
  listFacilities,
  addNewFacility,
  updateSubscription 
} = require('../controllers/adminController');

// All routes in this file are Admin Only
router.use(authenticateJWT, authorizeRoles('admin'));

router.get('/overview', getDashboardOverview);
router.get('/facilities', listFacilities);
router.post('/facilities', addNewFacility);
router.put('/facilities/:id/subscription', updateSubscription);

module.exports = router;