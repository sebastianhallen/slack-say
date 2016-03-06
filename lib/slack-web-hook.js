'use strict';

const slackhook = process.env.SLACK_HOOK;
const request = require('request-promise');

function say(message, as, to, emoji) {
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

module.exports.say = say;