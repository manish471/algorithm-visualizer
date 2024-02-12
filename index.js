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
app.use(helmet());

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cookieSession(config.cookieSession));
app.use(cookieParser());

//Initialize passport auth
app.use(passport.initialize());
app.use(passport.session());

// Connect all routes to the server
app.use(routes);

if (process.env.NODE_ENV === "production") {
    const path = require("path");
    app.use(express.static(path.resolve(__dirname, 'client', 'build')));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'),function (err) {
            if(err) {
                res.status(500).send(err)
            }
        });
    })
}

app.listen(port,()=>{
    console.log(`server is running at ${port}`);
});