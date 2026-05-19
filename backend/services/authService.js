// services/authService.js
const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (phone, fullName, role, password, nationalId = null) => {
  const hashed = await bcrypt.hash(password, 12);
  const result = await pool.query(
    `INSERT INTO users (phone, full_name, role, password_hash, national_id)
     VALUES ($1, $2, $3, $4, $5) RETURNING id, phone, role, full_name`,
    [phone, fullName, role, hashed, nationalId]
  );
  return result.rows[0];
};

const login = async (phone, password) => {
  const result = await pool.query('SELECT * FROM users WHERE phone = $1 AND is_active = true', [phone]);
  const user = result.rows[0];
  if (!user || !(await bcrypt.compare(password, user.password_hash))) {
    throw new Error('Invalid credentials');
  }

  const token = jwt.sign(
  { 
    id: user.id, 
    role: user.role, 
    phone: user.phone,
    facility_id: user.facility_id   // ← Important for hospitals
  },
  process.env.JWT_SECRET,
  { expiresIn: process.env.JWT_EXPIRES_IN }
);
  return { token, user: { id: user.id, role: user.role, full_name: user.full_name, facility_id: user.facility_id } };
};

module.exports = { register, login };