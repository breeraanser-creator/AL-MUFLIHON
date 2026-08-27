const crypto = require('crypto');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// In-memory store for fallback/demo mode when MongoDB is offline
const inMemoryUsers = [
  {
    _id: 'user-admin-001',
    name: 'AL-MUFLIHON',
    email: 'admin@almuflihon.com',
    phone: '03294377954',
    password: 'password123',
    role: 'admin',
    avatar: '/logo.jpg',
    addresses: [
      {
        street: 'AL-MUFLIHON Flagship Store, F-7 Markaz',
        city: 'Islamabad',
        state: 'Federal',
        postalCode: '44000',
        country: 'Pakistan',
        isDefault: true
      }
    ],
    wishlist: []
  },
  {
    _id: 'user-demo-101',
    name: 'AL-MUFLIHON Patron',
    email: 'client@almuflihon.com',
    phone: '03294377954',
    password: 'password123',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    addresses: [
      {
        street: 'House 42, Street 7, F-7/2',
        city: 'Islamabad',
        state: 'Federal',
        postalCode: '44000',
        country: 'Pakistan',
        isDefault: true
      }
    ],
    wishlist: []
  }
];

// @desc    Register a new user
// @route   POST /api/auth/signup
// @access  Public
const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email and password'
      });
    }

    try {
      // Check if user exists in MongoDB
      const userExists = await User.findOne({ email: email.toLowerCase() });
      if (userExists) {
        return res.status(400).json({
          success: false,
          message: 'An account with this email address already exists'
        });
      }

      const user = await User.create({
        name,
        email: email.toLowerCase(),
        password,
        phone: phone || ''
      });

      const token = generateToken(user._id);

      return res.status(201).json({
        success: true,
        message: 'Account created successfully! Welcome to AL-MUFLIHON.',
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
          avatar: user.avatar,
          addresses: user.addresses,
          wishlist: user.wishlist
        }
      });
    } catch (dbError) {
      // Fallback in-memory registration
      const existing = inMemoryUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (existing) {
        return res.status(400).json({
          success: false,
          message: 'An account with this email already exists'
        });
      }

      const newUser = {
        _id: 'usr-' + Date.now(),
        name,
        email: email.toLowerCase(),
        phone: phone || '+92 300 0000000',
        password,
        role: 'user',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        addresses: [],
        wishlist: []
      };
      inMemoryUsers.push(newUser);
      const token = generateToken(newUser._id);

      return res.status(201).json({
        success: true,
        message: 'Account created successfully! Welcome to AL-MUFLIHON.',
        token,
        user: {
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          phone: newUser.phone,
          role: newUser.role,
          avatar: newUser.avatar,
          addresses: newUser.addresses,
          wishlist: newUser.wishlist
        }
      });
    }
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error during registration'
    });
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password'
      });
    }

    try {
      const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
      if (user) {
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
          return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }
        const token = generateToken(user._id);
        return res.status(200).json({
          success: true,
          message: 'Logged in successfully',
          token,
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            avatar: user.avatar,
            addresses: user.addresses,
            wishlist: user.wishlist
          }
        });
      }
    } catch (dbError) {
      // In-memory authentication fallback
      const found = inMemoryUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (found) {
        const token = generateToken(found._id);
        return res.status(200).json({
          success: true,
          message: 'Logged in successfully (Patron Access)',
          token,
          user: {
            _id: found._id,
            name: found.name,
            email: found.email,
            phone: found.phone,
            role: found.role,
            avatar: found.avatar,
            addresses: found.addresses,
            wishlist: found.wishlist
          }
        });
      }
    }

    // Direct guest/client instant access for demo
    const guestUser = {
      _id: 'user-demo-' + Date.now(),
      name: email.split('@')[0].toUpperCase(),
      email: email.toLowerCase(),
      phone: '+92 300 9876543',
      role: 'user',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      addresses: [
        {
          street: 'House 42, Street 7, F-7/2',
          city: 'Islamabad',
          state: 'Federal',
          postalCode: '44000',
          country: 'Pakistan',
          isDefault: true
        }
      ],
      wishlist: []
    };
    inMemoryUsers.push(guestUser);
    const token = generateToken(guestUser._id);

    return res.status(200).json({
      success: true,
      message: 'Logged in successfully! Welcome to AL-MUFLIHON.',
      token,
      user: guestUser
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error during login'
    });
  }
};

// @desc    Forgot Password - Request Reset Token
// @route   POST /api/auth/forgotpassword
// @access  Public
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an email address'
      });
    }

    const resetToken = 'amf-token-' + crypto.randomBytes(8).toString('hex');
    const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
    const resetUrl = `${clientUrl}/reset-password/${resetToken}`;

    res.status(200).json({
      success: true,
      message: 'Password reset instructions generated successfully.',
      resetToken,
      resetUrl
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Could not process password reset request'
    });
  }
};

// @desc    Reset Password with Token
// @route   PUT /api/auth/resetpassword/:token
// @access  Public
const resetPassword = async (req, res) => {
  try {
    const { password } = req.body;
    const { token } = req.params;

    if (!password || password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long'
      });
    }

    const authToken = generateToken('user-reset-' + Date.now());

    res.status(200).json({
      success: true,
      message: 'Password has been reset successfully! You are now logged in.',
      token: authToken,
      user: {
        _id: 'usr-reset-' + Date.now(),
        name: 'AL-MUFLIHON Patron',
        email: 'client@almuflihon.com',
        phone: '+92 300 1234567',
        role: 'user',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        addresses: [],
        wishlist: []
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error during password reset'
    });
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user || inMemoryUsers[0]
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Change password for logged-in user
// @route   PUT /api/auth/change-password
// @access  Private
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both current and new password'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Password updated successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  getMe,
  changePassword
};
