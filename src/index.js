const express = require('express');
const bodyParser = require('body-parser');
const { getAllTalkers, getTalkerById, createNewTalker } = require('./utils/handleTalkers');
const { generateToken, validateToken } = require('./utils/token');
const { validateEmail, validatePassword } = require('./middleware/validateLogin');
const { validateTalkerName, validateTalkerAge, validateTalkerTalk,
  validateTalkRate, validateTalkWatchDate } = require('./middleware/validateTalker');

const app = express();
app.use(bodyParser.json());

const PORT = '3000';

const HTTP_OK_STATUS = 200;
const CREATED = 201;
const NOT_FOUND = 404;

// não remova esse endpoint, e para o avaliador funcionar!
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

app.get('/talker', async (_req, res) => {
  const talkers = await getAllTalkers();
  res.status(HTTP_OK_STATUS).json(talkers);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talker = await getTalkerById(id);
  if (!talker) return res.status(NOT_FOUND).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(HTTP_OK_STATUS).json(talker);
});

app.post('/login', validateEmail, validatePassword, async (_req, res) => {
  res.status(HTTP_OK_STATUS).json({ token: generateToken() });
});

app.post('/talker', validateToken, validateTalkerName, validateTalkerAge, validateTalkerTalk, 
validateTalkRate, validateTalkWatchDate, async (req, res) => {
  const { name, age, talk } = req.body;
  const newTalker = await createNewTalker(name, age, talk);
  res.status(CREATED).json(newTalker);
});
