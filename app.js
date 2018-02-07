var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var routes = require('./routes');
var historyApiFallback = require('connect-history-api-fallback')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);
app.use(historyApiFallback());
app.use(express.static('./dist'));
app.set('port', process.env.PORT || 3010);
app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

