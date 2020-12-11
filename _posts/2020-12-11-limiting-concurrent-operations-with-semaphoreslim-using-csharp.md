---
layout: post
title: Limiting Concurrent Operations With SemaphoreSlim Using C#
tags: dotnet
---

If you're looking to limit the number of concurrent operations but maintain as high throughput as possible [`SemaphoreSlim`](https://docs.microsoft.com/en-us/dotnet/api/system.threading.semaphoreslim) can help! For instance, this could help maintain a consistent flow of HTTP requests to an external API during a bulk processing operation -- respecting the limits of the external API to not potentially overwhelm it with too many concurrent requests.

## Example

```csharp
using System.Threading;
using System.Threading.Tasks;

namespace MyApp
{
    public class MyService
    {
        private const int MaximumConcurrentOperations = 10;

        private static readonly SemaphoreSlim RateLimit = new SemaphoreSlim(
            initialCount: MaximumConcurrentOperations,
            maxCount: MaximumConcurrentOperations);

        public async Task Process()
        {
            await RateLimit.WaitAsync();

            try
            {
                // Rate limited logic here
            }
            finally
            {
                RateLimit.Release();
            }
        }
    }
}
```

## maxCount

If `maxCount` is not specified `int.MaxValue` is used. **From my understanding `maxCount` in this context is sort of a safety mechanism, making sure you aren't releasing more than waiting.**

Consider the following example:

```csharp
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace MyApp
{
    class Program
    {
        static readonly SemaphoreSlim SemaphoreSlim =
            new SemaphoreSlim(initialCount: 1);

        static void Main(string[] args)
        {
            var tasks = new List<Task>();

            for (var i = 0; i < 10; i++)
            {
                tasks.Add(Task.Run(() =>
                {
                    SemaphoreSlim.Wait();

                    Console.WriteLine($"Start task, CurrentCount: {SemaphoreSlim.CurrentCount}");
                    Thread.Sleep(100);
                    Console.WriteLine($"End task, CurrentCount: {SemaphoreSlim.CurrentCount}");

                    SemaphoreSlim.Release();
                    SemaphoreSlim.Release(); // Extra call to Release();
                }));

            }

            Task.WaitAll(tasks.ToArray());
        }
    }
}
```

With example output:

```
Start task, CurrentCount: 0
End task, CurrentCount: 0
Start task, CurrentCount: 1
Start task, CurrentCount: 0
End task, CurrentCount: 0
End task, CurrentCount: 0
Start task, CurrentCount: 1
Start task, CurrentCount: 0
Start task, CurrentCount: 0
Start task, CurrentCount: 1
End task, CurrentCount: 0
End task, CurrentCount: 0
End task, CurrentCount: 0
End task, CurrentCount: 0
Start task, CurrentCount: 1
Start task, CurrentCount: 0
Start task, CurrentCount: 1
End task, CurrentCount: 5
End task, CurrentCount: 5
End task, CurrentCount: 5
```

However, if the `SemaphoreSlim` is changed to `new SemaphoreSlim(initialCount: 1, maxCount: 1)` then `System.Threading.SemaphoreFullException` is thrown instead.

## Summary

Rate limiting using `SemaphoreSlim` can help avoid overwhelming external services with too many concurrent requests while maintaining high throughput.
