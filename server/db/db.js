var mongoose = require('mongoose');
if (process.env.NODE_ENV !== 'production') { 
      require('dotenv').config(); 
} 

let mongoUrl = process.env.DB_CLOUD;

mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);
mongoose.Promise = global.Promise;
mongoose.connect(mongoUrl,(res)=>console.log('Connected to Mongo DB ',res));


//Register the Schemas & Models here ====>