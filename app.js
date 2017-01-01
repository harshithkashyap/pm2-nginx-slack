'use strict';

const os = require('os');
const pmx = require('pmx');
const Promise = require('bluebird');
const request = Promise.promisifyAll(require('request'));
const conf = pmx.initModule();
const Tail = require('tail').Tail;

let statusCodes = conf.status_codes || '400, 500, 502';
statusCodes = statusCodes.split(', ').join('|');
const statusCodeRegex =  new RegExp(`/^[^"]*"[^"]*\sHTTP\/[\d.]+"\s+(?:${statusCodes})\s.*$/`);

const access_log_path = conf.access_log_path || '/var/log/nginx/access.log';

const messages = [];

function processQueue () {
	if (messages.length > 0) {
		sendMessage(messages.shift());
	}

	setTimeout(processQueue, 30000);
}

function sendMessage (message) {
	if (!conf.slack_url) {
		return console.error('There is no Slack URL set, please set the Slack URL: "pm2 set pm2-slack-nginx-logs:slack_url https://slack_url"');
	}

	const payload = {
		username: os.hostname(),
		attachments: [{
			fields: [{
				title: message.name,
				description: message.description
			}]
		}]
	};
	
	const options = {
		method: 'post',
		body: payload,
		json: true,
		url: conf.slack_url
	};

	request(options)
		.then((res, body) => {
			if (body !== 'ok') {
				console.error('Error sending notification to Slack, verify that the Slack URL for incoming webhooks is correct.');
			}
		})
		.catch(console.error);
}

const tail = new Tail(access_log_path);
tail.on('line', row => {
	if (statusCodeRegex.test(row)) {
		messages.push({
			description: `${row}`
		});
	}
});

tail.on('error', console.error);

processQueue();