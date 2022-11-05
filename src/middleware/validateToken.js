const UNAUTHORIZED = 401;

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
  validateToken,
};