---
layout: post
title: Debugging Fan-Out Operation Failures With Custom Exception Messages Using Durable Functions Extension For Azure Functions On C#
tags: azure-functions durable-functions
---

[Durable Functions](https://learn.microsoft.com/en-us/azure/azure-functions/durable/durable-functions-overview) is an extension for [Azure Functions](https://learn.microsoft.com/en-us/azure/azure-functions/functions-overview) to help write stateful services in a stateless environment. There's an orchestration pattern named [Fan out/fan in](https://learn.microsoft.com/en-us/azure/azure-functions/durable/durable-functions-overview?tabs=csharp#fan-in-out) that can be helpful for contacting a number of external services and waiting for their replies. **When one or more of these services throws an exception (for instance, calling `EnsureSuccessStatusCode()` on the response) it can be difficult to determine which service or services are having problems.**

See the following:

```csharp
var serviceUrl = "https://example.com";

var httpClient = httpClientFactory.CreateClient();
var response = await httpClient.GetAsync(serviceUrl);

// Example: "Response status code does not indicate success: 500 (Internal Server Error)."
// can be difficult to debug since it doesn't indicate the url for the service.
response.EnsureSuccessStatusCode();
```

Instead of `EnsureSuccessStatusCode()` change it to the code below:

```csharp
var serviceUrl = "https://example.com";

var httpClient = httpClientFactory.CreateClient();
var response = await httpClient.GetAsync(serviceUrl);

if (!response.IsSuccessStatusCode)
{
    // Example: "GET https://example.com returned non-success HTTP status code: 500 InternalServerError."
    throw new HttpRequestException(
        $"{request.Method} {request.RequestUri} returned non-success HTTP status code: {(int)response.StatusCode} {response.StatusCode}.");
}
```

This can help identify the service or services that are having an issue when debugging issues with Durable Functions.
