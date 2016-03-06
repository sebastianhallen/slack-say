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
  app.set('views', __dirname + '/views');
  
  function register(route, name, emoji, defaultMessage) {
    console.log('registering ' + name + ' at ' + route + ' - ' + defaultMessage);
    
    app.get(route, (request, response) => {
      response.render('slack-say', {
        route,
        name,
        defaultMessage
      });
    });
    
    app.post(route, (request, response) => {
      const message = request.body.message;
      const to = request.body.to;
      console.log(to + ': ' + message);
      
      slack.send(message, name, to, emoji)
        .then(result => {
          console.log('message sent: ' + result);
          response.redirect(route + '?result=' + result + '&message=' + message + '&to=' + to);
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
