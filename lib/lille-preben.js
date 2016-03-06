'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const slack = require('./slack-web-hook');

const app = express();

app.use(bodyParser());

function lillePreben(to, message) {
  return slack.say(message, 'Lille Preben', to, ':lillepreben:');
}

app.get('/lillepreben', (req, res) => {
  let formView = '<html><body>' +
    '<form method="post" action="/lillepreben">' +
      '<label for="message">message</label>' +
      '<input type="text" name="message" id="message" /><br />' +
      '<label for="to">to</label>' +
      '<input type="text" name="to" id="to" /><br />' +
      '<input type="submit" value="Lille Preben sajjer">' +
    '</form></body></html>';
  res.send(formView);
});

app.post('/lillepreben', (req, res) => {
  const message = req.body.message;
  const to = req.body.to;
  console.log(to + ': ' + message);
  
  lillePreben(to, message)
    .then(result => res.redirect('/lillepreben?result=' + result + '&message=' + message + '&to=' + to));
});

module.exports = app;
