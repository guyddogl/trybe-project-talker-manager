const express = require('express');
const bodyParser = require('body-parser');
const loginRouter = require('./routes/loginRoutes');
const { getAllTalkers, getTalkerById, createNewTalker, updateTalker, 
  deleteTalker, searchTalkers } = require('./utils/talkers');
const { validateToken } = require('./middleware/validateToken');
const { validateTalkerName, validateTalkerAge, validateTalkerTalk,
  validateTalkRate, validateTalkWatchDate } = require('./middleware/validateTalker');

const app = express();
app.use(bodyParser.json());

const PORT = '3000';

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

const HTTP_OK_STATUS = 200;
const CREATED = 201;
const NO_CONTENT = 204;
const NOT_FOUND = 404;

app.get('/talker/search', validateToken, async (req, res) => {
  const { q } = req.query;
  const search = await searchTalkers(q);
  res.status(HTTP_OK_STATUS).json(search);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talker = await getTalkerById(id);
  if (!talker) return res.status(NOT_FOUND).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(HTTP_OK_STATUS).json(talker);
});

app.get('/talker', async (_req, res) => {
  const talkers = await getAllTalkers();
  res.status(HTTP_OK_STATUS).json(talkers);
});

// não remova esse endpoint, e para o avaliador funcionar!
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.use('/login', loginRouter);

app.post('/talker', validateToken, validateTalkerName, validateTalkerAge, validateTalkerTalk, 
validateTalkRate, validateTalkWatchDate, async (req, res) => {
  const { name, age, talk } = req.body;
  const newTalker = await createNewTalker(name, age, talk);
  res.status(CREATED).json(newTalker);
});

app.put('/talker/:id', validateToken, validateTalkerName, validateTalkerAge, validateTalkerTalk, 
validateTalkRate, validateTalkWatchDate, async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const editedTalker = await updateTalker(id, name, age, talk);
  res.status(HTTP_OK_STATUS).json(editedTalker);
});

app.delete('/talker/:id', validateToken, async (req, res) => {
  const { id } = req.params;
  await deleteTalker(id);
  res.status(NO_CONTENT).send();
});
