---
layout: post
title: Lessons Learned Implementing a Must Succeed Durable Functions Workflow
tags: azure-functions durable-functions
---

[Durable Functions](https://learn.microsoft.com/en-us/azure/azure-functions/durable/durable-functions-overview) is an extension for [Azure Functions](https://learn.microsoft.com/en-us/azure/azure-functions/functions-overview) to help write stateful services in a stateless environment. **Here's a few thoughts for a successful production implementation of a must succeed workflow.** (and by *must succeed*, I mean a workflow where failure results in a broken state)

## Consider Failures And How To Mitigate Them

Outages in dependent services can be short or lengthy. For transient issues or short outages building a retry policy into the orchestration may help, depending on your use case. However, at some point you may want to fail the entire orchestration when it seems retries will not fix it without something changing. Retrying activities is built into Durable Functions, see [https://learn.microsoft.com/en-us/azure/azure-functions/durable/durable-functions-error-handling#automatic-retry-on-failure](https://learn.microsoft.com/en-us/azure/azure-functions/durable/durable-functions-error-handling#automatic-retry-on-failure).

If the retry policy is exhausted and items are left in a broken state, now what? It can be helpful to consider this issue early and build for it. **If you're able to retry the entire orchestration from the beginning, creating a process to manually restart from the beginning may help.** As part of this process you may want to retry all failed items for a datetime range and/or retry specific failed items. **If you're not able to retry the entire workflow from the beginning you may need to get more creative than simply running it again, but at least you're thinking about it before it happens.**

## On Failure Activity

It can be helpful to have a graceful failure activity. This gives an opportunity to make any data updates, log additional info, etc.

Using C# it could look like this:

```csharp
[FunctionName("MyProcess_Start")]
public async Task Start(
    [OrchestrationTrigger] IDurableOrchestrationContext context)
{
    try
    {
        // Logic here, context.CallActivityWithRetryAsync calls that retry
        // will stay at the statement and throw if retry policy is exhausted.
    }
    catch
    {
        await context.CallActivityWithRetryAsync(
            "MyProcess_Failed",
            RetryOptions, // not defined here, specify your own
            (dataItem1, dataItem2));
    }
}

[FunctionName("MyProcess_Failed")]
public async Task Failed(
    [ActivityTrigger] IDurableActivityContext inputs)
{
    (string dataItem1, string dataItem2) =
        inputs.GetInput<(string, string)>();

    // Run on failure logic here
}
```

## Instrumentation

It can be helpful to view information about the state of each workflow item. Whether you store a viewable state on your own, use Application Insights, or inspect the underlying Durable Functions infrastructure, it may be useful to look at these items before you need to in response to an issue.

## Other Posts

For debugging: [Thoughts On Debugging Durable Functions Extension Orchestrations For Azure Functions Backed By Azure Table Storage]({% post_url 2021-03-31-thoughts-on-debugging-durable-functions-extension-orchestrations-for-azure-functions-backed-by-azure-table-storage %})

If you're building a fan-out operation you may find this post helpful *(it may be difficult to tell which operation or operations are having issues)*: [Debugging Fan-Out Operation Failures With Custom Exception Messages Using Durable Functions Extension For Azure Functions On C#]({% post_url 2021-03-16-debugging-fan-out-operation-failures-with-custom-exception-messages-using-durable-functions-extension-for-azure-functions-on-csharp %})
