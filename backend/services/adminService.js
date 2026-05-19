// services/adminService.js
const pool = require('../config/db');

const getSystemOverview = async () => {
  const result = await pool.query(`
    SELECT 
      (SELECT COUNT(*) FROM users WHERE role = 'patient') as total_patients,
      (SELECT COUNT(*) FROM users WHERE role = 'chv') as total_chvs,
      (SELECT COUNT(*) FROM facilities WHERE subscription_status = 'active') as active_hospitals,
      (SELECT COUNT(*) FROM cases) as total_cases,
      (SELECT COUNT(*) FROM cases WHERE risk_level IN ('high', 'critical')) as high_risk_cases,
      (SELECT COUNT(*) FROM referrals WHERE status = 'pending') as pending_referrals,
      (SELECT COUNT(*) FROM call_sessions WHERE started_at >= NOW() - INTERVAL '24 hours') as calls_today
  `);
  return result.rows[0];
};

const getAllFacilities = async () => {
  const result = await pool.query(`
    SELECT * FROM facilities 
    ORDER BY created_at DESC
  `);
  return result.rows;
};

const createFacility = async (facilityData) => {
  const { name, county, sub_county, latitude, longitude, contact_phone } = facilityData;
  
  const result = await pool.query(
    `INSERT INTO facilities (name, county, sub_county, latitude, longitude, contact_phone)
     VALUES ($1, $2, $3, $4, $5, $6) 
     RETURNING *`,
    [name, county, sub_county, latitude, longitude, contact_phone]
  );
  return result.rows[0];
};

const updateFacilitySubscription = async (facilityId, subscriptionStatus, expiresAt) => {
  const result = await pool.query(
    `UPDATE facilities 
     SET subscription_status = $1, 
         subscription_expires_at = $2,
         updated_at = NOW()
     WHERE id = $3 
     RETURNING *`,
    [subscriptionStatus, expiresAt, facilityId]
  );
  return result.rows[0];
};

const getFacilityById = async (id) => {
  const result = await pool.query('SELECT * FROM facilities WHERE id = $1', [id]);
  return result.rows[0];
};

module.exports = {
  getSystemOverview,
  getAllFacilities,
  createFacility,
  updateFacilitySubscription,
  getFacilityById
};