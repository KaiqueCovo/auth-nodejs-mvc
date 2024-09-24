const express = require('express');
const router = express.Router();
const { renderLoginPage, login, logout } = require('../controllers/auth');
const authMiddleware = require('../middlewares/auth');

// Página inicial (login)
router.get('/', renderLoginPage);

// Login
router.post('/login', login);

// Logout
router.get('/logout', logout);

// Página protegida (dashboard)
router.get('/dashboard', authMiddleware, (req, res) => {
  res.render('dashboard', { user: req.session.user });
});

module.exports = router;
