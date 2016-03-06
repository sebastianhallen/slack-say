'use strict';

const slackhook = process.env.SLACK_HOOK;
const request = require('request-promise');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser());

function lillePreben(to, message) {
  return say('Lille Preben', to, message, ':lillepreben:');
}

function say(username, to, message, emoji) {
  const payload = {
    text: message,
    username: username,
    icon_emoji: emoji,
    channel: to
  };
  
  const requestOptions = {
    uri: slackhook,
    method: 'POST',
    body: payload,
    json: true 
  };
  
  return request(requestOptions)
    .then(result => {
      console.log(result);
      return result;
    });
}

app.get('/lillepreben', (req, res) => {
  let formView = '<html><body>' +
    '<form method="post" action="/lillepreben">' +
      '<label for="message">message</label>' + 
      '<input type="text" name="message" id="message" /><br />' +
      '<label for="to">to</label>' +
      '<input type="text" name="to" id="to" />' +
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

console.log('kan jeg hjelpe deg med noget?');
app.listen(3000);