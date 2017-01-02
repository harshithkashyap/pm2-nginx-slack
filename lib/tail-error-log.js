'use strict';

const Tail = require('tail').Tail;
const conf = require('./pm2-conf');
const messages = require('./messages').messages;

const error_log_path = conf.error_log_path;
const slackUrl = conf.slack_error_log_url;

if (conf.tail_error_log) {
	if (!slackUrl) {
		console.error('There is no Slack URL set for error log, please set the error log Slack URL: "pm2 set pm2-nginx-slack:slack_error_log_url https://slack_url"');
	}

	const tail = new Tail(error_log_path);
	tail.on('line', row => {
		messages.push({
			name: 'nginx-error-log',
			description: `${row}`,
			slackUrl
		});
	});

	tail.on('error', console.error);
}