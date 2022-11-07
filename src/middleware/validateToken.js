const { HTTP_STATUS_UNAUTHORIZED } = require('../utils/httpStatus');

const validateToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(HTTP_STATUS_UNAUTHORIZED).json({ message: 'Token não encontrado' });
  }
  if (token.length !== 16) {
    return res.status(HTTP_STATUS_UNAUTHORIZED).json({ message: 'Token inválido' });
  }
  next();
};

module.exports = {
  validateToken,
};