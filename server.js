'use strict';

const slack = require('./slack-say')();

slack.register('/lille-preben', 'Lille Preben', ':lillepreben:', 'kan jeg hjelpe deg med noget?');
slack.register('/lumbergh', 'Lumberg', ':lumbergh:', 'Yeaahhh... If you can come in Saturday that would be great.');

slack.start();