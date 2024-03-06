---
layout: post
title: C# Tasks Unexpectedly Running More Than Once (Async Lambda IEnumerable&lt;Task&gt; With foreach Loop)
tags: csharp dotnet
---

Consider the following example:

```csharp
using System;
using System.Linq;
using System.Threading.Tasks;
                    
public class Program
{
    public static async Task Main()
    {
        var items = new[] { "a", "b", "c", "d", "e" };

        var tasks = items.Select(async item =>
        {
            Console.WriteLine(item);
            await Task.Delay(1);
        })
        // One method to fix:
        // .ToList()
        ;
            
        await Task.WhenAll(tasks);
            
        foreach (var task in tasks)
        {
            // The Console.WriteLine(item); to print the item runs again
            Console.WriteLine(task.Id);
        }
    }
}
```

## What's happening?

The tasks are being constructed twice, once in the LINQ `Select` and once in the `foreach` loop.

**We can fix this by calling `ToList()` on the `IEnumeable<Task>` returned by the LINQ `Select`.**

Hope that helps!
