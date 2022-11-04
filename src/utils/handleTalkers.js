const { readFile } = require('fs').promises;
const path = require('path');

const talkersPath = path.resolve(__dirname, '..', 'talker.json');

const getAllTalkers = async () => {
  const response = await readFile(talkersPath, 'utf8');
  const talkers = JSON.parse(response);
  return talkers;
};

module.exports = {
  getAllTalkers,
};