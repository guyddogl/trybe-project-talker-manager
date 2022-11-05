const express = require('express');
const { HTTP_STATUS_OK } = require('../utils/httpStatus');
const { generateToken } = require('../utils/token');
const { validateEmail, validatePassword } = require('../middleware/validateLogin');

const router = express.Router();

router.post('/', validateEmail, validatePassword, async (_req, res) => {
  res.status(HTTP_STATUS_OK).json({ token: generateToken() });
});

module.exports = router;