const express = require('express');
var bodyParser = require("body-parser");
var cors = require('cors')

const app = express();
//Fix No 'Access-Control-Allow-Origin' issue
app.use(cors())
const port = process.env.PORT || 5000;
var models = require("./models");

// Configure body parser for AJAX requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("client/build"));
const routes = require("./routes");
app.use(routes);


function onError(error){
    console.log(error);
}

function onListening(){
    console.log(`🌎 Listening on port ${port}`);
}

models.sequelize.sync().then(function () {
    // app.listen(port);
    app.on('error', onError);
    app.on('listening', onListening);
    app.listen(port, () => console.log(`Listening on port ${port}`));
  });


