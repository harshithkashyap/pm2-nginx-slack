'use strict';

const Tail = require('tail').Tail;
const conf = require('./pm2-conf');
const messages = require('./messages').messages;

const access_log_path = conf.access_log_path;
const slackUrl = conf.slack_access_log_url;

if (conf.tail_access_log) {
	if (!slackUrl) {
		console.error('There is no Slack URL set for access log, please set the access log Slack URL: "pm2 set pm2-nginx-slack:slack_access_log_url https://slack_url"');
	}

	let statusCodes = conf.status_codes;
	statusCodes = statusCodes.split(', ').join('|');

	const statusCodeRegex =  new RegExp(`^[^"]*"[^"]*\\sHTTP\/[\\d.]+"\\s+(?:${statusCodes})\\s.*$`);
	const tail = new Tail(access_log_path);
	tail.on('line', row => {
		if (statusCodeRegex.test(row)) {
			messages.push({
				name: 'nginx-access-log',
				description: `${row}`,
				slackUrl
			});
		}
	});

	tail.on('error', console.error);
}