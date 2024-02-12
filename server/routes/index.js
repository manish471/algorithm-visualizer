const routes = require("express").Router();

//Importing routes from api
const auth = require('./api/auth');
const execute = require('./api/execute');
const transpile = require('./api/transpile');
const datastructure = require('./api/datastructure');
const code = require('./api/code');


//All apis
routes.use("/api/auth", auth);
routes.use("/api/execute", execute);
routes.use("/api/transpile", transpile);
routes.use("/api/datastructure", datastructure);
routes.use("/api/code", code);


// Handing Errors 
routes.use( (err, req, res, next) => {
    console.log("missed all", err)
  // treat as 404
  if (err.message
    && (~err.message.indexOf('not found')
    || (~err.message.indexOf('Cast to ObjectId failed')))) {
      return res.status(500).json({error:err.name, message: err.message});
  }


  if (err.stack.includes('ValidationError')) {
    return res.status(422).json({error:err.name, message: err.message});
  }
  // server not responding
  res.status(500).json({error:err.name, message: err.message});
});

// routes.get('/', (req, res) => {
// return res.status(200).json({ message: 'Connected!',user:req.user });
// });

if (process.env.NODE_ENV === "production") {
  const path = require("path");
  routes.use(express.static(path.resolve(__dirname, 'client', 'build')));
  routes.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'),function (err) {
          if(err) {
              res.status(500).send(err)
          }
      });
  })
}

// Assume 404 since no middleware responded
routes.use( (req, res) => {
  const payload = {
    url: req.originalUrl,
    error: 'Not found'
  };
  if (req.accepts('json')) return res.status(404).json(payload);
  return res.status(404).send({error:err.name, message: err.message});
});



module.exports = routes;