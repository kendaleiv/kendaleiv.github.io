---
layout: post
title: Avoid Exposing Status Uri From Durable Functions Extension For Azure Functions To Untrusted Parties (It Contains A Secret Key!)
tags: azure-functions durable-functions
---

[Durable Functions](https://learn.microsoft.com/en-us/azure/azure-functions/durable/durable-functions-overview) is an extension for [Azure Functions](https://learn.microsoft.com/en-us/azure/azure-functions/functions-overview) to help write stateful services in a stateless environment. **It can return helpful information, including a status uri, but this contains a secret key by default! Be careful not to expose this to untrusted parties.**

`/runtime/webhooks/durabletask/instances/abc123abc123abc123abc123abc123ab?taskHub=mytaskhub&connection=Storage&code=code-here` ends with a `code` query string paramater containing the secret key.

Consider building a custom status endpoint, securing it as needed.

## If Deployed, Rotate The Key(s)!

The `code` appended to the url as a query string parameter is a system key that enables access to Durable Functions at an administrative level for the Azure Functions instance. You'll want to rotate the impacted any `durabletask_extension` system keys in your Azure Functions applications.

## More Info

- [https://learn.microsoft.com/en-us/azure/azure-functions/durable/durable-functions-instance-management?tabs=csharp#retrieve-http-management-webhook-urls](https://learn.microsoft.com/en-us/azure/azure-functions/durable/durable-functions-instance-management?tabs=csharp#retrieve-http-management-webhook-urls)
- [https://github.com/Azure/azure-functions-durable-extension/blob/165159e22eaa9bf4039ab6ef292311e6a58cb7c8/src/WebJobs.Extensions.DurableTask/HttpApiHandler.cs#L1059-L1104](https://github.com/Azure/azure-functions-durable-extension/blob/165159e22eaa9bf4039ab6ef292311e6a58cb7c8/src/WebJobs.Extensions.DurableTask/HttpApiHandler.cs#L1059-L1104) includes a comment that a systemKey will be added.
