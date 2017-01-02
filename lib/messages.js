'use strict';

const Promise = require('bluebird');
const os = require('os');
const request = Promise.promisifyAll(require('request'));
const messages = [];

const processMessages = () => {
	if (messages.length > 0) {
		sendMessage(messages.shift())
			.then(res => {
				if (res.body === 'ok') {
					setTimeout(processMessages, 10000);
				} else {
					console.error('Error sending notification to Slack, verify that the Slack URL for incoming webhooks is correct.');
				}

			})
			.catch(console.error);
	} else {
		setTimeout(processMessages, 10000);
	}
};

const sendMessage = message => {
	const payload = {
		username: os.hostname(),
		attachments: [{
			fallback: `${message.name} - ${message.description}`,
			color: '#D00000', //Defaults to red
			fields: [{
				title: message.name,
				value: message.description,
				short: true
			}]
		}]
	};
	
	const options = {
		body: payload,
		json: true,
		url: message.slackUrl
	};

	return request.postAsync(options);
};

module.exports = {
	processMessages,
	sendMessage,
	messages
};