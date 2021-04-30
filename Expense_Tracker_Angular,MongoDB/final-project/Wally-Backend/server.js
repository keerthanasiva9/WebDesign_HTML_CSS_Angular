const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const config = require('./api/config/database.config');
var cors = require('cors');
const passport = require ('passport');


const app = express();
//Adding body parser for handling request and response objects.
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//Enabling CORS
app.use(cors());

app.get('/',(req,res) => {
    res.json({'message':'Welcome'}); 
});

// mongoose instance connection url connection
mongoose.connect(config.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Connected to database");
}).catch(() => {
    console.log("Error connecting to database");
});

let initApp = require('./api/routes/app.route');
initApp(app)

app.use(passport.initialize());
app.use(passport.session());
require('./api/config/passport')(passport);

const port = 3000;
app.listen(port,() => {
    console.log("Server Running on port"+" "+port);
});