const crypto = require('crypto'); // geeksforgeeks.org/node-js-crypto-randombytes-method/

const generateToken = () => crypto.randomBytes(8).toString('hex');

module.exports = {
  generateToken,
};