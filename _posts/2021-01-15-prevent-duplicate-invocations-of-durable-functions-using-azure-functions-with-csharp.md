---
layout: post
title: Prevent Duplicate Invocations of Durable Functions Using Azure Functions With C#
tags: azure-functions durable-functions dotnet
---

[Durable Functions](https://docs.microsoft.com/en-us/azure/azure-functions/durable/durable-functions-overview) is an extension for [Azure Functions](https://docs.microsoft.com/en-us/azure/azure-functions/functions-overview) to help write stateful services in a stateless environment. **When starting a new process, you may want to verify it isn't already running by checking the list of in-flight Durable Functions with some custom logic.**

Durable Functions includes functionality to [Query all instances](https://docs.microsoft.com/en-us/azure/azure-functions/durable/durable-functions-instance-management?tabs=csharp#query-all-instances) which can help us.

**Note:** With many in-flight Durable Functions this approach could be problematic by needing to query many pages of results.

## Code

Here's a starting point to work from, copy and edit as needed:

```csharp
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.DurableTask;
using Microsoft.Azure.WebJobs.Extensions.Http;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;

namespace MyApplication
{
    public class Api
    {
        [FunctionName("Initiate")]
        public async Task<HttpResponseMessage> Initiate(
            [HttpTrigger(AuthorizationLevel.User, "post", Route = "my/route")] HttpRequestMessage req,
            [DurableClient] IDurableOrchestrationClient client)
        {
            string listContinuationToken = null;
            do
            {
                var currentInstances = await client.ListInstancesAsync(
                    new OrchestrationStatusQueryCondition
                    {
                        ContinuationToken = listContinuationToken,
                        RuntimeStatus = new[]
                        {
                            OrchestrationRuntimeStatus.ContinuedAsNew,
                            OrchestrationRuntimeStatus.Pending,
                            OrchestrationRuntimeStatus.Running
                        }
                    },
                    CancellationToken.None);

                var alreadyRunning = currentInstances.DurableOrchestrationState
                    .Any(x => /* Logic here */);

                if (alreadyRunning)
                {
                    return new HttpResponseMessage(HttpStatusCode.BadRequest)
                    {
                        Content = new StringContent("This process is currently running.")
                    };
                }

                listContinuationToken = currentInstances.ContinuationToken;
            }
            while (listContinuationToken != null);

            var instanceId = await client.StartNewAsync("BeginProcess");

            return client.CreateCheckStatusResponse(req, instanceId);
        }

        [FunctionName("BeginProcess")]
        public async Task<IEnumerable<string>> BeginProcess(
            [OrchestrationTrigger] IDurableOrchestrationContext context)
        {
            // Code here
        }
    }
}
```
