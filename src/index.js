const express = require('express');
const { HTTP_STATUS_OK } = require('./utils/httpStatus');
const loginRouter = require('./routes/loginRoutes');
const talkerRouter = require('./routes/talkerRoutes');

const app = express();
app.use(express.json());

const PORT = '3000';

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

// não remova esse endpoint, e para o avaliador funcionar!
app.get('/', (_request, response) => response.status(HTTP_STATUS_OK).send());

app.use('/login', loginRouter);
app.use('/talker', talkerRouter);
