'use strict';

const slack = require('./lib/slack-say')();

slack.register('/lille-preben', 'Lille Preben', ':lillepreben:');

console.log('kan jeg hjelpe deg med noget?');
slack.start();