---
layout: post
title: Monitoring Web Application Deployment Impact Using Artillery
tags: web
---

If you're looking to monitor the state of your web application during a deployment it can be useful to run a bunch of requests to see the impact during deployment. We can use a load testing tool, like [Artillery](https://artillery.io/), to accomplish this.

## Using Artillery

Artillery can be configured via test scripts, but it can also use command line arguments for simple scenarios. You'll need [Node.js](https://nodejs.org/) installed to run Artillery. From the command line you can test the endpoint for **10 requests per second (rate) for 10 minutes (duration in seconds)**:

`npx artillery@1 quick --rate=10 --duration=600 https://example.org/health`

Artillery provides an update every 10 seconds, and provides a summary at the end like this:

```
Summary report @ 15:28:18(-0500) 2020-12-16
  Scenarios launched:  6000
  Scenarios completed: 6000
  Requests completed:  6000
  Mean response/sec: 9.99
  Response time (msec):
    min: 77.2
    max: 909.3
    median: 98
    p95: 158.5
    p99: 279.7
  Scenario counts:
    0: 6000 (100%)
  Codes:
    200: 6000
```

If any non-success status codes were returned, like 500, they'd show up here. This means users could be impacted during the deployment.

## Global install

If you're frequently running Artillery you may want to globally install it via `npm install -g artillery`, rather than use `npx` each time. After it's globally installed you can omit `npx` from the above command.
