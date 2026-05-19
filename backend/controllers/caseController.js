// controllers/caseController.js
const caseService = require('../services/caseService');

const createNewCase = async (req, res) => {
  try {
    const { symptoms, anonymizedInput } = req.body;
    const userId = req.user.id;           // From JWT
    const chvId = req.user.role === 'chv' ? req.user.id : null;

    const newCase = await caseService.createCase(
      userId,
      chvId,
      symptoms,
      anonymizedInput || {}
    );

    res.status(201).json({
      message: "Case created successfully",
      case: newCase
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMyCases = async (req, res) => {
  try {
    const cases = await caseService.getCasesByUser(req.user.id);
    res.json(cases);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllCasesAdmin = async (req, res) => {
  try {
    const cases = await caseService.getAllCases(100);
    res.json(cases);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCaseDetails = async (req, res) => {
  try {
    const caseData = await caseService.getCaseById(req.params.id);
    if (!caseData) return res.status(404).json({ error: "Case not found" });
    res.json(caseData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createNewCase,
  getMyCases,
  getAllCasesAdmin,
  getCaseDetails
};