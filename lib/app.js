const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(require('cookie-parser')());

// Allow public route to serve static images from /public on node server as virtual path /poegrams
app.use('/poegrams', express.static('public'));

app.use('/auth', require('./routes/users'));
app.use('/api/v1/poems', require('./routes/poems'));
app.use('/api/v1/poegrams', require('./routes/poegrams'));
app.use('/api/v1/create', require('./routes/create'));
app.use('/api/v1/authors', require('./routes/authors'));


app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;

