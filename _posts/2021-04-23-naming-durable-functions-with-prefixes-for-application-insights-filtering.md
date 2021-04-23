---
layout: post
title: Naming Durable Functions With Prefixes For Application Insights Filtering
tags: azure-functions durable-functions
---

[Durable Functions](https://docs.microsoft.com/en-us/azure/azure-functions/durable/durable-functions-overview) is an extension for [Azure Functions](https://docs.microsoft.com/en-us/azure/azure-functions/functions-overview) to help write stateful services in a stateless environment. After deploying Durable Functions functionality to an existing Azure Functions application you may find the average response time in Application Insights appears degraded. **If you want to verify performance metrics haven't degraded in a user-facing manner it may be helpful to filter out Durable Functions items from Application Insights.**

## Application Insights Query

Durable Functions with a consistent prefix can be filtered out from Application Insights queries with a single `where` statement.

`| where operation_Name !startswith "MyPrefix_"`

A full example might look like:

```
let start=datetime("2021-04-22T00:00:00.000Z");
let end=datetime("2021-04-23T00:00:00.000Z");
let timeGrain=5m;
let dataset=requests
    | where timestamp > start and timestamp < end
    | where client_Type != "Browser"
    | where operation_Name !startswith "MyPrefix_"
;
dataset
| summarize avg(duration) by bin(timestamp, timeGrain)
| extend request='Overall'
| render timechart
```

## C# Example

This is a C# .NET Core 3.1 example. Apply the same idea to any other supported version or language.

```csharp
[FunctionName("Initiate")]
public async Task<IActionResult> Initiate(
    [HttpTrigger(AuthorizationLevel.User, "post", Route = "initiate")] HttpRequestMessage req,
    [DurableClient] IDurableOrchestrationClient client)
{
    await client.StartNewAsync(
        "MyPrefix_RunProcess",
        new
        {
            Arg1 = "Arg1-value",
            Arg2 = "Arg2-value"
        });

    return new AcceptedResult();
}

[FunctionName("MyPrefix_RunProcess")]
public async Task MyPrefix_RunProcess([OrchestrationTrigger] IDurableOrchestrationContext context)
{
    var input = context.GetInput<JObject>();

    var arg1 = input["Arg1"].Value<string>();
    var arg2 = input["Arg2"].Value<string>();

    await context.CallActivityAsync("MyPrefix_Activity1", (arg1, arg2));

    await context.CallActivityAsync("MyPrefix_Activity2", arg1);
}

[FunctionName("MyPrefix_Activity1")]
public async Task Activity1([ActivityTrigger] IDurableActivityContext inputs)
{
    (var arg1, var arg2) = inputs.GetInput<(string, string)>();

    await Task.Delay(TimeSpan.FromSeconds(30));
}

[FunctionName("MyPrefix_Activity2")]
public async Task Activity2([ActivityTrigger] IDurableActivityContext inputs)
{
    var arg1 = inputs.GetInput<string>();

    await Task.Delay(TimeSpan.FromSeconds(15));
}
```
