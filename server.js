const express = require('express');
var bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 5000;
var models = require("./models");

require("./routes/author")(app);
require("./routes/post")(app);

// Configure body parser for AJAX requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));
// Add routes, both API and view

function onError(error){
    console.log(error);
}

function onListening(){
    console.log(`Listening on port ${port}`);
}

models.sequelize.sync().then(function () {
    // app.listen(port);
    app.on('error', onError);
    app.on('listening', onListening);
    app.listen(port, () => console.log(`Listening on port ${port}`));
  });


