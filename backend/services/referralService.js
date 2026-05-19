// services/referralService.js
const pool = require('../config/db');

const createReferral = async (caseId, facilityId, notes = '') => {
  const result = await pool.query(
    `INSERT INTO referrals (case_id, facility_id, notes, status)
     VALUES ($1, $2, $3, 'pending') 
     RETURNING *`,
    [caseId, facilityId, notes]
  );
  return result.rows[0];
};

const getHospitalReferrals = async (facilityId, status = null) => {
  let query = `
    SELECT r.*, 
           c.risk_level, 
           c.symptoms, 
           c.created_at as case_date,
           u.full_name as patient_name,
           u.phone as patient_phone,
           ai.explanation,
           ai.guidance
    FROM referrals r
    JOIN cases c ON r.case_id = c.id
    JOIN users u ON c.user_id = u.id
    LEFT JOIN ai_responses ai ON ai.case_id = c.id
    WHERE r.facility_id = $1
  `;

  const params = [facilityId];

  if (status) {
    query += ` AND r.status = $2`;
    params.push(status);
  }

  query += ` ORDER BY r.created_at DESC`;

  const result = await pool.query(query, params);
  return result.rows;
};

const updateReferralStatus = async (referralId, status, notes = '') => {
  const result = await pool.query(
    `UPDATE referrals 
     SET status = $1, 
         notes = COALESCE(notes, '') || '\n' || $2,
         updated_at = NOW()
     WHERE id = $3 
     RETURNING *`,
    [status, notes, referralId]
  );
  return result.rows[0];
};

const getReferralById = async (referralId) => {
  const result = await pool.query(`
    SELECT r.*, 
           c.*, 
           u.full_name as patient_name,
           f.name as facility_name
    FROM referrals r
    JOIN cases c ON r.case_id = c.id
    JOIN users u ON c.user_id = u.id
    JOIN facilities f ON r.facility_id = f.id
    WHERE r.id = $1
  `, [referralId]);
  return result.rows[0];
};

module.exports = {
  createReferral,
  getHospitalReferrals,
  updateReferralStatus,
  getReferralById
};