'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const slack = require('./slack-web-hook');

function init() {
  const app = express();
  app.use(bodyParser());
  
  function register(route, name, emoji, defaultMessage) {
    console.log('registering ' + name + ' at ' + route + ' - ' + defaultMessage);
    
    app.get(route, (request, response) => {
      let formView = '<html><body>' +
        '<form method="post" action="' + route + '">' +
          '<label for="to">to: </label>' +
          '<input type="text" name="to" id="to" /><br />' +
          '<label for="message">message: </label><br />' +
          '<textarea name="message" id="message" rows="10" cols="50">' + defaultMessage +'"</textarea><br />' +
          '<input type="submit" value="Say">' +
        '</form></body></html>';
      response.send(formView);
    });
    
    app.post(route, (request, response) => {
      const message = request.body.message;
      const to = request.body.to;
      console.log(to + ': ' + message);
      
      slack.send(message, name, to, emoji)
        .then(result => response.redirect(route + '?result=' + result + '&message=' + message + '&to=' + to));
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
