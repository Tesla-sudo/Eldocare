// controllers/adminController.js
const adminService = require('../services/adminService');

const getDashboardOverview = async (req, res) => {
  try {
    const stats = await adminService.getSystemOverview();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const listFacilities = async (req, res) => {
  try {
    const facilities = await adminService.getAllFacilities();
    res.json(facilities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addNewFacility = async (req, res) => {
  try {
    const facility = await adminService.createFacility(req.body);
    res.status(201).json({
      message: "Hospital/Facility added successfully",
      facility
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateSubscription = async (req, res) => {
  try {
    const { id } = req.params;
    const { subscription_status, subscription_expires_at } = req.body;

    const updated = await adminService.updateFacilitySubscription(
      id, 
      subscription_status, 
      subscription_expires_at
    );

    res.json({
      message: "Subscription updated successfully",
      facility: updated
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getDashboardOverview,
  listFacilities,
  addNewFacility,
  updateSubscription
};