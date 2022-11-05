const express = require('express');
const { HTTP_STATUS_OK, HTTP_STATUS_CREATED, 
  HTTP_STATUS_NO_CONTENT, HTTP_STATUS_NOT_FOUND } = require('../utils/httpStatus');
const { getAllTalkers, getTalkerById, createNewTalker, updateTalker, 
  deleteTalker, searchTalkers } = require('../utils/talkers');
const { validateToken } = require('../middleware/validateToken');
const { validateTalkerName, validateTalkerAge, validateTalkerTalk,
  validateTalkRate, validateTalkWatchDate } = require('../middleware/validateTalker');

const router = express.Router();

router.get('/search', validateToken, async (req, res) => {
  const { q } = req.query;
  const search = await searchTalkers(q);
  res.status(HTTP_STATUS_OK).json(search);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talker = await getTalkerById(id);
  if (!talker) {
 return res.status(HTTP_STATUS_NOT_FOUND)
  .json({ message: 'Pessoa palestrante não encontrada' }); 
}
  res.status(HTTP_STATUS_OK).json(talker);
});

router.get('/', async (_req, res) => {
  const talkers = await getAllTalkers();
  res.status(HTTP_STATUS_OK).json(talkers);
});

router.post('/', validateToken, validateTalkerName, validateTalkerAge, validateTalkerTalk, 
validateTalkRate, validateTalkWatchDate, async (req, res) => {
  const { name, age, talk } = req.body;
  const newTalker = await createNewTalker(name, age, talk);
  res.status(HTTP_STATUS_CREATED).json(newTalker);
});

router.put('/:id', validateToken, validateTalkerName, validateTalkerAge, validateTalkerTalk, 
validateTalkRate, validateTalkWatchDate, async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const editedTalker = await updateTalker(id, name, age, talk);
  res.status(HTTP_STATUS_OK).json(editedTalker);
});

router.delete('/:id', validateToken, async (req, res) => {
  const { id } = req.params;
  await deleteTalker(id);
  res.status(HTTP_STATUS_NO_CONTENT).send();
});

module.exports = router;