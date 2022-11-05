const express = require('express');
const { generateToken } = require('../utils/token');
const { validateEmail, validatePassword } = require('../middleware/validateLogin');

const router = express.Router();

const HTTP_OK_STATUS = 200;

router.post('/', validateEmail, validatePassword, async (_req, res) => {
  res.status(HTTP_OK_STATUS).json({ token: generateToken() });
});

module.exports = router;