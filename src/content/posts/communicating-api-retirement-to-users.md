---
title: "Communicating API Retirement to Users"
pubDatetime: 2026-10-20T00:00:00-04:00
featured: true
description: "Strategies for communicating API retirement to users, including web messaging, API response updates, and implementation concerns."
tags: ["api", "retirement", "deprecation", "communication"]
---

If you own one or more APIs, eventually you may want to retire them. If others depend on it, you'll likely want a retirement strategy to minimize the impact. Whether that means pointing users to a new API, or simply breaking the news, there are ways to communicate about upcoming retirement.

## Before retirement

Ideally users have as much time as possible to handle the retirement news. A reasonable amount of notification time could be very dependent on what the API does, its importance to you and users, and other factors.

### Communication strategies

If the API being retired has a website, documentation site, or any other web presence, communicating the news on one or all of these may be applicable. It's your API, you know what the best strategy is.

### API response updates

In addition to web presence news updates, you can also update API responses to communicate to users without breaking API calls.

You could add these response headers to all API responses:

```
Deprecation: @1798761599
Sunset: Wed, 30 Jun 2027 23:59:59 GMT
Link: https://api.example.com/deprecations/v1; rel="deprecation”
Link: https://api.example.com/deprecations/v1; rel="sunset”
```

Deprecation can signal the beginning of brownouts, while sunset is the final retirement. In this case, deprecation is 2026-12-31 23:59:59 UTC with sunset at 2027-06-30 23:59:59 UTC.

RFC references:

- [RFC 9745: The Deprecation HTTP Response Header Field](https://www.rfc-editor.org/info/rfc9745/) (also mentions Sunset)
- [RFC 8594: The Sunset HTTP Header Field](https://www.rfc-editor.org/info/rfc8594/)

### Usage validation 

For an actively used API, it may be wise to investigate incoming requests. The number of users, the quantity of requests, etc. can be valuable information as part of a retirement strategy. Understanding traffic patterns can help guide decision making.

### Brownouts

Leading up to the API being unavailable, users may not see the news or see the API response updates. For this, brownouts can signal to users they need to take action. Having the API be temporarily unavailable can force users to investigate and ideally discover the retirement notice.

Brownouts could be time based, whether hours per day, a percentage of requests fail, or maybe something else entirely. And, it could ramp up to more hours or a higher percentage over time too. You could even increase the unavailability until it's unavailable all the time, leading into the day of retirement. You know your API, you know what might be the best here.

For brownouts you could return an HTTP **503 Service Unavailable** response with retirement details in the response body. If the API has a specific error response, like Problem Details, you could use that as well. If the API publishes one or more API packages ideally it would work well with that to surface the message to the user.

## Day of retirement

For the day of retirement, you could treat the response similar to a brownout, but use HTTP **410 Gone** with a retirement response body instead. This response code signals this resource is no longer available.

Follow the same guidance from the brownout response body here too to best serve your users – use an error response body that users and any specific API clients / libraries expect.

## Observe

After an API has been turned off, you may want to monitor the incoming requests to assess the impact of having it turned off. If you see traffic patterns that are not favorable, you may need to rollback to re-enable the API. Depending on the use case, you may even want to do this before customers reach out, especially if you're certain it's going to block their workflow.

### Rollback

If something goes critically wrong as a result of the retirement, you may want or need to be able to quickly react and re-enable the retired functionality. If it's a cloud hosted web app, consider stopping it rather than deleting it to enable faster rollback. Ideally consider how long re-enabling the API will take upfront. If the timing is unknown you could even run a drill in a non-production environment.

## Closing

This provides different options and advice for communicating API retirement. It's up to you to decide what is the most appropriate for your particular case.
