const express = require('express');
const ejs = require('ejs');
const fs = require('fs');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const http = require('http').Server(app);
const mqtt = require('./services/mqttService');


app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.set('layout', 'layout');
app.set('layout extractScripts', true);
app.use(expressLayouts);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/static', express.static(__dirname + '/public'));
app.use('/css', express.static(__dirname + '/node_modules/jquery-ui-dist'));
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/js', express.static(__dirname + '/node_modules/moment'));
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/js', express.static(__dirname + '/node_modules/jquery-ui-dist'));
app.use('/js', express.static(__dirname + '/node_modules/datatables.net/js'));
app.use('/js', express.static(__dirname + '/node_modules/axios/dist'));

const mainRoute = require('./routes/mainRoute');

app.use('/', mainRoute);

http.listen(9502,'0.0.0.0', () => {
    console.log('server start');
});
