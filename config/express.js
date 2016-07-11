var express = require("express");
var morgan = require("morgan");
var bodyParser = require("body-parser");
var mustacheExpress = require('mustache-express');
var validator = require("express-validator");

module.exports = function(){
  var app = express();

  // Debug
  if(process.env.NODE_ENV==="development"){
    app.use(morgan("dev"));
  }

  // bodyParser and validator
  app.use(bodyParser.urlencoded({
    extended:true
  }));
  app.use(bodyParser.json());
  app.use(validator());


  // View Engine
  app.engine('mustache', mustacheExpress());
  app.set("views",["/"]);
  app.set("view engine","mustache");


  // Routes
  require("../routes/index.routes")(app);
  require("../routes/users.routes")(app);

  //app.use(express.static("./public"));

  return app;
}
