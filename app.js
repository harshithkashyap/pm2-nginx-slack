'use strict';
const messages = require('./lib/messages');

require('./lib/pm2-conf');
require('./lib/tail-access-log');
require('./lib/tail-error-log');

messages.processMessages();