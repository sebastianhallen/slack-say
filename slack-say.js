'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const slack = require('./slack-web-hook');
const handlebars = require('express-handlebars')

function init() {
  const app = express();
  app.use(bodyParser());
  
  app.engine('handlebars', handlebars({defaultLayout: 'main'}));
  app.set('view engine', 'handlebars');
  app.set('views', './views');
  app.use('/assets', express.static('assets'));
  
  function register(options) {
    console.log('registering ' + options.name + ' at ' + options.route + ' - ' + options.defaultMessage);
    
    app.get(options.route, (request, response) => {
      response.render('slack-say', {
        route: options.route,
        name: options.name,
        defaultMessage: options.defaultMessage,
        additionalScripts: options.additionalScripts || []
      });
    });
    
    app.post(options.route, (request, response) => {
      const message = request.body.message;
      const to = request.body.to;
      console.log(to + ': ' + message);
      
      slack.send(message, options.name, to, options.emoji)
        .then(result => {
          console.log('message sent: ' + result);
          response.redirect(options.route + '?result=' + result + '&message=' + message + '&to=' + to);
        });
    });
  }
  
  function start() {
    app.listen(process.env.PORT || 3000);
  }
  
  return {
    register,
    start
  };
}

module.exports = init;
