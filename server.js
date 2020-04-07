require('dotenv').config();
require('./lib/utils/connect')();

const app = require('./lib/app');

const PORT = process.env.PORT || 7890;

app.listen(PORT, () => {
//brew services restart mongodb-community
  console.log(`Started on ${PORT}`);
});
