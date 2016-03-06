'use strict';

const slackhook = process.env.SLACK_HOOK;
const request = require('request-promise');

function send(message, as, to, emoji) {
  const payload = {
    text: message,
    username: as,
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

module.exports.send = send;