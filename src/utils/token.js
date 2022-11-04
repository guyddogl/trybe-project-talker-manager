const crypto = require('crypto'); // geeksforgeeks.org/node-js-crypto-randombytes-method/

const UNAUTHORIZED = 401;

const generateToken = () => crypto.randomBytes(8).toString('hex');

const validateToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(UNAUTHORIZED).json({ message: 'Token não encontrado' });
  }
  if (token.length !== 16) {
    return res.status(UNAUTHORIZED).json({ message: 'Token inválido' });
  }
  next();
};

module.exports = {
  generateToken,
  validateToken,
};