const express = require('express');
const cors = require('cors');
const { PORT } = require('./config/config');

require('./config/db');

const app = express();

app.use(express.json());
app.use(cors());
app.use('/user', require('./routes/user'));
app.use('/posts', require('./routes/post'));
app.use('/categories', require('./routes/category'));

app.listen(PORT, () => console.log('Server listening on: ' + PORT));