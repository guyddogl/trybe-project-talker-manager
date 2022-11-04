const BAD_REQUEST = 400;

const validateEmail = (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return res.status(BAD_REQUEST).json({ message: 'O campo "email" é obrigatório' });
  }
  const isValidEmail = email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g);
  if (!isValidEmail) {
    return res.status(BAD_REQUEST).json({
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  }
  next();
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;
  if (!password) {
    return res.status(BAD_REQUEST).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.toString().length < 6) {
    return res.status(BAD_REQUEST)
    .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
};

module.exports = {
  validateEmail,
  validatePassword,
};