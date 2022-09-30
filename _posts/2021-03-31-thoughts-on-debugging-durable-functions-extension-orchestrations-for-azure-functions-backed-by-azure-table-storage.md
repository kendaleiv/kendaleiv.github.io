---
layout: post
title: Thoughts On Debugging Durable Functions Extension Orchestrations For Azure Functions Backed By Azure Table Storage
tags: azure-functions durable-functions
---

[Durable Functions](https://learn.microsoft.com/en-us/azure/azure-functions/durable/durable-functions-overview) is an extension for [Azure Functions](https://learn.microsoft.com/en-us/azure/azure-functions/functions-overview) to help write stateful services in a stateless environment. **Here's a few thoughts I've compiled for debugging Durable Functions orchestrations.**

**Note:** This post assumes Azure Table Storage is the backend data store.

## Finding The InstanceId

A good first step is finding the `InstanceId` if you don't already have it. This is the `PartitionKey` for table storage which can filter the tables for this specific instance.

In table storage you'll find two tables, one ending in `History` and one ending in `Instances`. The `Instances` can be helpful for determining the `InstanceId`, as the `InstanceId` is the `PartitionKey` in table storage and it contains the input parameters for each instance.

**Note:** If multiple Azure Functions applications are running the same code but using their own backend state storage for Durable Functions you'll need to find which web app is handling the Durable Functions instance. You can guess and check Table Storage or query Application Insights for the `appName` using an [Instance summary query](https://learn.microsoft.com/en-us/azure/azure-functions/durable/durable-functions-diagnostics#instance-summary-query).

## Tooling

Here's a few options:

- **View Table Storage directly**: A quick option is browsing to table storage directly via the Azure portal. Navigate the storage account on the Azure portal, open Storage Explorer on the left pane, expand Tables, view the `History` and `Instance` tables filtering by `PartitionKey` as the `InstanceId` where helpful.
- **[Durable Functions Monitor](https://github.com/scale-tone/DurableFunctionsMonitor)**: Per the repository README.md: "A monitoring/debugging UI tool for Azure Durable Functions". There's different options for running it, including a Visual Studio Code extension.
- **Azure Functions Core Tools**: If you prefer the command line check out this docs page, noting the "Azure Functions Core Tools" headings: [Manage instances in Durable Functions in Azure](https://learn.microsoft.com/en-us/azure/azure-functions/durable/durable-functions-instance-management). Run the commands from the root folder of the Azure Functions application. For non-local debugging you'll need to update the storage connection string. By default, it uses the `AzureWebJobsStorage` storage connection string but can be overridden.
- **Application Insights**: If data is being logged to Application Insights you can run queries. For example, [Instance summary query](https://learn.microsoft.com/en-us/azure/azure-functions/durable/durable-functions-diagnostics#instance-summary-query) "... displays the status of all orchestration instances that were run in a specified time range." which you may find useful if you're looking for a high level view, which can help bridge between multiple Azure Functions applications running the same code.

## Thoughts For Future Debugging

After you've worked through an issue you have an opportunity to potentially make a similar investigation easier next time.

- Would setting a [Custom Status](https://learn.microsoft.com/en-us/azure/azure-functions/durable/durable-functions-diagnostics#custom-status) help?
- If it's a fan-out/fan-in operation would enhancing exception messages with the HTTP verb, url, and information about the response help *(HTTP status code or perhaps even the response body, depending on confidentiality concerns with logging the response content)*? You may find my [Debugging Fan-Out Operation Failures With Custom Exception Messages Using Durable Functions Extension For Azure Functions On C#]({% post_url 2021-03-16-debugging-fan-out-operation-failures-with-custom-exception-messages-using-durable-functions-extension-for-azure-functions-on-csharp %}) post useful if that sounds helpful.

Hope this helps if you're investigating an issue!
