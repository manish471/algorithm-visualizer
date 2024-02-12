var mongoose = require('mongoose');
const config = require('../config/config');

let mongoUrl = config.db_cloud;
// let mongoUrl = config.db_cloud;

mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);
mongoose.Promise = global.Promise;
mongoose.connect(mongoUrl,(res)=>console.log('Connected to Mongo DB ',res));


//Register the Schemas & Models here ====>