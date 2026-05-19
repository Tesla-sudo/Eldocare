// services/caseService.js
const pool = require('../config/db');

const createCase = async (userId, chvId = null, symptoms = '', anonymizedInput = {}) => {
  const result = await pool.query(
    `INSERT INTO cases (user_id, chv_id, symptoms, anonymized_input, risk_level, status)
     VALUES ($1, $2, $3, $4, $5, $6) 
     RETURNING *`,
    [userId, chvId, symptoms, anonymizedInput, 'pending', 'open']
  );
  return result.rows[0];
};

const getCaseById = async (caseId) => {
  const result = await pool.query(`
    SELECT c.*, u.full_name as patient_name, chv.full_name as chv_name
    FROM cases c
    LEFT JOIN users u ON c.user_id = u.id
    LEFT JOIN users chv ON c.chv_id = chv.id
    WHERE c.id = $1
  `, [caseId]);
  return result.rows[0];
};

const getCasesByUser = async (userId) => {
  const result = await pool.query(
    `SELECT * FROM cases WHERE user_id = $1 ORDER BY created_at DESC`,
    [userId]
  );
  return result.rows;
};

const getAllCases = async (limit = 50) => {
  const result = await pool.query(`
    SELECT c.*, u.full_name as patient_name 
    FROM cases c
    JOIN users u ON c.user_id = u.id
    ORDER BY c.created_at DESC 
    LIMIT $1
  `, [limit]);
  return result.rows;
};

const updateRiskLevel = async (caseId, riskLevel, aiResponseId = null) => {
  const result = await pool.query(
    `UPDATE cases 
     SET risk_level = $1, 
         status = CASE WHEN $1 IN ('high', 'critical') THEN 'referred' ELSE status END
     WHERE id = $2 
     RETURNING *`,
    [riskLevel, caseId]
  );
  return result.rows[0];
};

const addReferral = async (caseId, facilityId, notes = '') => {
  const result = await pool.query(
    `INSERT INTO referrals (case_id, facility_id, notes)
     VALUES ($1, $2, $3) RETURNING *`,
    [caseId, facilityId, notes]
  );
  return result.rows[0];
};

module.exports = {
  createCase,
  getCaseById,
  getCasesByUser,
  getAllCases,
  updateRiskLevel,
  addReferral
};