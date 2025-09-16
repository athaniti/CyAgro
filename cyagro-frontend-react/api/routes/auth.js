const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const { executeQuery, findOne } = require('../config/database');

const router = express.Router();

// Login endpoint
router.post('/login', [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Find user by email
    const userResult = await findOne(
      'SELECT * FROM users WHERE email = ? AND status = "active"',
      [email]
    );

    if (!userResult.success || !userResult.data) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = userResult.data;

    // For demo purposes, we'll accept any password
    // In production, you should verify against hashed password
    // const isValidPassword = await bcrypt.compare(password, user.password_hash);
    // if (!isValidPassword) {
    //   return res.status(401).json({ error: 'Invalid credentials' });
    // }

    // Update last login
    await executeQuery(
      'UPDATE users SET last_login = NOW() WHERE id = ?',
      [user.id]
    );

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    // Return user data (exclude sensitive information)
    const userData = {
      id: user.id,
      fullName: user.full_name,
      email: user.email,
      uniqueCode: user.unique_code,
      idNumber: user.id_number,
      phone: user.phone,
      hasProfile: user.has_profile,
      status: user.status
    };

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: userData
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Mock CY-Login authentication (for development)
router.post('/cy-login', [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty()
], async (req, res) => {
  try {
    const { email } = req.body;

    // Simulate CY-Login response
    // In production, this would connect to actual CY-Login system
    setTimeout(async () => {
      // Check if user exists
      let userResult = await findOne(
        'SELECT * FROM users WHERE email = ?',
        [email]
      );

      let userData;
      
      if (userResult.success && userResult.data) {
        // Existing user
        userData = {
          id: userResult.data.id,
          fullName: userResult.data.full_name,
          email: userResult.data.email,
          uniqueCode: userResult.data.unique_code,
          idNumber: userResult.data.id_number,
          phone: userResult.data.phone,
          hasProfile: userResult.data.has_profile
        };
      } else {
        // New user - create with basic CY-Login data
        const newUserResult = await executeQuery(
          'INSERT INTO users (full_name, email, unique_code, id_number, phone, has_profile) VALUES (?, ?, ?, ?, ?, ?)',
          ['Πέτρος Ιακώβου', email, 'CY' + Date.now(), '123456789', '+357 99123456', false]
        );

        if (newUserResult.success) {
          userData = {
            id: newUserResult.data.insertId,
            fullName: 'Πέτρος Ιακώβου',
            email: email,
            uniqueCode: 'CY' + Date.now(),
            idNumber: '123456789',
            phone: '+357 99123456',
            hasProfile: false
          };
        }
      }

      res.json({
        success: true,
        user: userData
      });
    }, 2000); // Simulate network delay

  } catch (error) {
    console.error('CY-Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Register/Complete profile endpoint
router.post('/register', [
  body('email').isEmail().normalizeEmail(),
  body('fullName').notEmpty().trim(),
  body('phone').optional().isMobilePhone(),
  body('idNumber').notEmpty().trim()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, fullName, phone, idNumber, uniqueCode } = req.body;

    // Update or create user profile
    const updateResult = await executeQuery(
      'UPDATE users SET full_name = ?, phone = ?, id_number = ?, has_profile = TRUE WHERE email = ?',
      [fullName, phone, idNumber, email]
    );

    if (updateResult.success) {
      // Get updated user data
      const userResult = await findOne(
        'SELECT * FROM users WHERE email = ?',
        [email]
      );

      if (userResult.success) {
        const userData = {
          id: userResult.data.id,
          fullName: userResult.data.full_name,
          email: userResult.data.email,
          uniqueCode: userResult.data.unique_code,
          idNumber: userResult.data.id_number,
          phone: userResult.data.phone,
          hasProfile: userResult.data.has_profile
        };

        res.json({
          success: true,
          message: 'Profile completed successfully',
          user: userData
        });
      }
    } else {
      res.status(500).json({ error: 'Failed to update profile' });
    }

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;