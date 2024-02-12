const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');
const cors = require("cors");
const helmet = require('helmet');

const routes = require("./server/routes");
const passport = require('./server/config/passport');
const db = require('./server/db/db');
const config = require('./server/config/config');


const port = process.env.PORT || 3001;

const app = express();

const corsOptions = {
    origin:(origin, cb) => {
        return cb(null, true);
      },
    credentials: true
};
  
app.use(cors(corsOptions));
// app.use(
//     helmet.contentSecurityPolicy({
//         useDefaults: true,
//         directives: {
//           "img-src": ["'self'", "https: data:"],
//           "script-src-elem":["'self'", "https: data:"],
//           "script-src":["'self'", "https: data:"],
//           "worker-src":["'self'", "https: data:"],
//         }
//       })
// );

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cookieSession(config.cookieSession));
app.use(cookieParser());

//Initialize passport auth
app.use(passport.initialize());
app.use(passport.session());

// Connect all routes to the server
app.use(routes);

app.listen(port,()=>{
    console.log(`server is running at ${port}`);
});