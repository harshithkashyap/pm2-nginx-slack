## Stream Nginx logs to Slack
[![Build Status](https://travis-ci.org/harshithkashyap/pm2-nginx-slack.svg?branch=master)](https://travis-ci.org/harshithkashyap/pm2-nginx-slack)

This module tails nginx error, access logs using [node-tail](https://github.com/lucagrulla/node-tail) and sends them to the specified slack channel.

### Installation

```shell
pm2 install pm2-nginx-slack
```

### Set slack webhook url

```shell
pm2 set pm2-nginx-slack:slack_access_log_url https://slack.url.com/ # Slack webhook to post access logs
pm2 set pm2-nginx-slack:slack_error_log_url https://slack.url.com/ # Slack webhook to post error logs

```

### Defaults

```json
{
    "slack_access_log_url": null,
    "slack_error_log_url": null,
    "access_log_path": "/var/log/nginx/access.log",
    "error_log_path": "/var/log/nginx/error.log",
    "tail_access_log": false,
    "tail_error_log": true,
    "status_codes": "400, 401, 403"
}
```
- slack_access_log_url - Slack webhook URL to post access logs
- slack_error_log_url - Slack webhook URL to post error logs
- access_log_path - Path to your nginx access log(Default: `/var/log/nginx/access.log`)
- error_log_path - Path to your nginx error log(Default: `/var/log/nginx/error.log`)
- tail_access_log - Enable/Disable tailing access log(Default: false)
- tail_error_log - Enable/Disable tailing error log(Default: true)
- status_codes - HTTP status codes to filter access logs(Default: 400, 401, 403)

The above configurations can be modified with the following syntax and the changes are applied automatically by pm2.
```shell
pm2 set pm2-nginx-slack:tail_access_log true
pm2 set pm2-nginx-slack:access_log_path /path/to/your/nginx/access.log
```

### Access logs
Access logs are disabled by default and can be enabled with the following command.
```shell
pm2 set pm2-nginx-slack:tail_access_log true
```
To filter nginx access logs, HTTP status codes 400, 401 & 403 are used by default. To enable filtering on custom HTTP status codes, use
```shell
pm2 set pm2-nginx-slack:status_codes "400, 404, 413" # Notice the comma-space seperated string
```

### References

[PM2-slack](https://github.com/mattpker/pm2-slack)

## License
[License](LICENSE) MIT
