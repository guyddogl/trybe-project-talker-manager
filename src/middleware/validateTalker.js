const { HTTP_STATUS_BAD_REQUEST } = require('../utils/httpStatus');

const validateTalkerName = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(HTTP_STATUS_BAD_REQUEST).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(HTTP_STATUS_BAD_REQUEST)
    .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const validateTalkerAge = (req, res, next) => {
  const { age } = req.body;
  if (!age) {
    return res.status(HTTP_STATUS_BAD_REQUEST).json({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18) {
    return res.status(HTTP_STATUS_BAD_REQUEST)
    .json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const validateTalkerTalk = (req, res, next) => {
  const { talk } = req.body;
  if (!talk) {
    return res.status(HTTP_STATUS_BAD_REQUEST).json({ message: 'O campo "talk" é obrigatório' });
  }
  next();
};

const validateTalkRate = (req, res, next) => {
  const { rate } = req.body.talk;
  if (rate == null) { 
    return res.status(HTTP_STATUS_BAD_REQUEST).json({ message: 'O campo "rate" é obrigatório' }); 
  }
  if (!Number.isInteger(rate) || rate < 1 || rate > 5) {
    return res.status(HTTP_STATUS_BAD_REQUEST)
    .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

const validateTalkWatchDate = (req, res, next) => {
  const { watchedAt } = req.body.talk;
  if (!watchedAt) {
    return res.status(HTTP_STATUS_BAD_REQUEST)
    .json({ message: 'O campo "watchedAt" é obrigatório' });
  }
  const isValidDate = watchedAt.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/); // https://stackoverflow.com/questions/5465375/javascript-date-regex-dd-mm-yyyy
  if (!isValidDate) {
    return res.status(HTTP_STATUS_BAD_REQUEST)
    .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

module.exports = {
  validateTalkerName,
  validateTalkerAge,
  validateTalkerTalk,
  validateTalkRate,
  validateTalkWatchDate,
};