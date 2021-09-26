const mongoose = require('mongoose');
const config = require('../config');

const mongoUrl = config.MONGO_URL;

const mongoConfig = {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
};

mongoose.Promise = global.Promise;

mongoose
    .connect(mongoUrl, mongoConfig)
    .then(() => {
        console.log('Mongodb Connected');
    })
    .catch((error) => {
        console.log('Mongodb Connection Failed', error);
    });

module.export = mongoose;
