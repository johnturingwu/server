var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var libs = process.cwd() + '/libs/';
var config = require('./config');
var log = require('./log')(module);

var api = require('./routes/api');
var getkey = require('./routes/getkey');
var keyforeid = require('./routes/keyforeid');
var resourceforeid = require('./routes/resourceforeid');
var gettemplate = require('./routes/gettemplate');
var getSource = require('./routes/getSource');
var keyfromresource = require('./routes/keyfromresource');
var exeplan = require('./routes/exeplan');
var init = require('./utils/cmds');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
  });

app.use('/', api);
app.use('/api', api);
app.use('/api/getkey', getkey);
app.use('/api/keyforeid',keyforeid);
app.use('/api/gettemplate', gettemplate);
app.use('/exeplan',exeplan);
app.use('/getSource',getSource);
app.use('/resourceforeid',resourceforeid);
app.use('/keyfromresource',keyfromresource);
// app.use('/init',init);

// app.use('/api/articles', articles);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
    res.status(404);
    log.debug('%s %d %s', req.method, res.statusCode, req.url);
    res.json({
        error: 'Not found'
    });
    return;
});
// app.get('/', function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     next();
// });

// Error handlers
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    log.error('%s %d %s', req.method, res.statusCode, err.message);
    console.log("..................x.");
    
    res.json({
        error: err.message
    });
    return;
});

module.exports = app;
