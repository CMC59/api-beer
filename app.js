var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var cors = require('cors');
var indexRouter = require('./routes/index');
var biereRouter = require('./routes/biere');
var regionRouter = require('./routes/region');


var app = express();
// Intégration de la bdd MOT DE PASSE VERS BDD OjVTgx07j89NU2uq
var connectionString = "mongodb+srv://philippeplaia:OjVTgx07j89NU2uq@iut.cmqto30.mongodb.net/biere";
var mongoDB = process.env.MONGODB_URI || connectionString;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/biere', biereRouter);
app.use('/region', regionRouter);

module.exports = app;
