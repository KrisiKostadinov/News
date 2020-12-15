const mongoose = require('mongoose');
const config = require('./config');

mongoose.connect(config.DB_URL,
    { useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
    },
    () => console.log('Connected to the db!'));