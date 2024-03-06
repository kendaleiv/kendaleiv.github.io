---
layout: post
title: C# List&lt;T&gt; Add Method Missing Items When Count Inspected When Adding Items In An Async Task
tags: csharp dotnet
---

Consider the following example:

```csharp
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

public class Program
{
    public static async Task Main()
    {
        var items = new List<string>(); // Does not consistently write 100 to console on my machine
        // Potential fix, if ConcurrentBag<T> works for your use case:
        // var items = new ConcurrentBag<string>();

        var tasks = Enumerable.Repeat("a", 100)
            .Select(async x =>
            {
                await Task.Delay(1);
                items.Add(x);
            });

        await Task.WhenAll(tasks);

        Console.WriteLine(items.Count);
    }
}
```

## What's happening?

`items.Count` may not consistently be `100`. `List<T>` is not thread-safe. We can replace it with `ConcurrentBag<T>`, provided a collection of thread-safe unordered objects works for your use case.

See [https://learn.microsoft.com/en-us/dotnet/api/system.collections.concurrent](https://learn.microsoft.com/en-us/dotnet/api/system.collections.concurrent) for other potential options.
