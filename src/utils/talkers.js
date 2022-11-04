const { readFile, writeFile } = require('fs').promises;
const path = require('path');

const talkersPath = path.resolve(__dirname, '..', 'talker.json');

const getAllTalkers = async () => {
  const response = await readFile(talkersPath, 'utf8');
  const talkers = JSON.parse(response);
  return talkers;
};

const getTalkerById = async (id) => {
  const talkers = await getAllTalkers();
  return talkers.find((talker) => talker.id === Number(id));
};

const createNewTalker = async (name, age, talk) => {
  const talkers = await getAllTalkers();
  const id = Number(talkers[talkers.length - 1].id) + 1;
  const newTalker = {
    id,
    name,
    age,
    talk,
  };
  talkers.push(newTalker);
  await writeFile(talkersPath, JSON.stringify(talkers, null, 2));
  return newTalker;
};

const updateTalker = async (id, name, age, talk) => {
  const talkers = await getAllTalkers();
  const editTalker = talkers.map((talker) => {
    if (talker.id === Number(id)) {
      return { ...talker, name, age, talk };
    }
    return talker;
  });
  await writeFile(talkersPath, JSON.stringify(editTalker, null, 2));
  return { id: Number(id), name, age, talk };
};

module.exports = {
  getAllTalkers,
  getTalkerById,
  createNewTalker,
  updateTalker,
};