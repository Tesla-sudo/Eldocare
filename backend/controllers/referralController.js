// controllers/referralController.js
const referralService = require('../services/referralService');
const caseService = require('../services/caseService');

const referCase = async (req, res) => {
  try {
    const { caseId, facilityId, notes } = req.body;

    // Optional: Only admin or high-risk logic can create referral
    const referral = await referralService.createReferral(caseId, facilityId, notes);

    // Update case status
    await caseService.updateRiskLevel(caseId, 'high'); // or whatever level

    res.status(201).json({
      message: "Patient referred successfully (Warm Handoff)",
      referral
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMyHospitalReferrals = async (req, res) => {
  try {
    const facilityId = req.user.facility_id;   // Important: Linked during login
    const { status } = req.query; // ?status=pending

    const referrals = await referralService.getHospitalReferrals(facilityId, status);
    res.json(referrals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateReferral = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    const updated = await referralService.updateReferralStatus(id, status, notes);
    res.json({ message: "Referral updated", referral: updated });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getReferralDetails = async (req, res) => {
  try {
    const referral = await referralService.getReferralById(req.params.id);
    if (!referral) return res.status(404).json({ error: "Referral not found" });
    res.json(referral);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  referCase,
  getMyHospitalReferrals,
  updateReferral,
  getReferralDetails
};