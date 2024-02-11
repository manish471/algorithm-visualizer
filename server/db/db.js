var mongoose = require('mongoose');
const config = require('../config/config');

let mongoUrl = process.env.NODE_ENV === undefined?config.db_local : config.db_cloud;
// let mongoUrl = config.db_cloud;

mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);
mongoose.Promise = global.Promise;
mongoose.connect(mongoUrl,()=>console.log('Connected to Mongo DB'));

//Register the Schemas & Models here ====>