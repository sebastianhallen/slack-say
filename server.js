'use strict';

const slack = require('./slack-say')();

slack.register({
  route: '/lille-preben',
  name: 'Lille Preben',
  emoji: ':lillepreben:',
  defaultMessage: 'kan jeg hjelpe deg med noget?',
  additionalScripts: [ 'prebenize.js' ]
});

slack.register({
  route: '/lumbergh',
  name: 'Lumberg',
  emoji: ':lumbergh:',
  defaultMessage: 'Yeaahhh... If you can come in Saturday that would be great.'
});

slack.register({
  route: '/tobot',
  name: 'Tobot',
  emoji: ':tobot:'
});

slack.register({
  route: '/bertil',
  name: 'Bertil',
  emoji: ':bertil:'
});

slack.start();