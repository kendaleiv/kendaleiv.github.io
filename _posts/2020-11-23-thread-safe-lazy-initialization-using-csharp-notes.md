---
layout: post
title: Thread Safe Lazy Initialization Using C# Notes
tags: dotnet
---

Sometimes it makes sense to lazily initialize something in an application. In the case of an application internal cache waiting until the first access of data to prime the cache could improve startup times. One way of lazy initialization with C# is [`Lazy<T>`](https://docs.microsoft.com/en-us/dotnet/api/system.lazy-1).

## `Lazy<T>`

Per [https://docs.microsoft.com/en-us/dotnet/api/system.lazy-1#thread-safety](https://docs.microsoft.com/en-us/dotnet/api/system.lazy-1#thread-safety) the default is *thread safe*, but can be disabled. **If you don't opt-out it's thread safe.**

```csharp
using System;

public class Program
{
    public static void Main()
    {
        // Uses LazyThreadSafetyMode.ExecutionAndPublication
        // See https://github.com/dotnet/corefx/blob/b8b81a66738bb10ef0790023598396861d92b2c4/src/Common/src/CoreLib/System/Lazy.cs#L240
        var lazyString = new Lazy<string>(() => "abc");

        Console.WriteLine(lazyString.Value); // abc
    }
}
```

Thread safety can be adjusted like

```csharp
var lazyString = new Lazy<string>(() => "abc", isThreadSafe: false);
```

Or:

```csharp
// Add:
// using System.Threading;

var lazyString1 = new Lazy<string>(() => "abc", LazyThreadSafetyMode.None);
var lazyString2 = new Lazy<string>(() => "abc", LazyThreadSafetyMode.PublicationOnly);
```

## `LazyThreadSafetyMode`

Different [`LazyThreadSafetyMode`](https://docs.microsoft.com/en-us/dotnet/api/system.threading.lazythreadsafetymode) values have characteristics you may be interested in:

- **`LazyThreadSafetyMode.ExecutionAndPublication` can deadlock if the initialization code has locks internally. It is also the default value.**
- `LazyThreadSafetyMode.None` can help for high performance scenarios when there's a guarantee it won't be called simultaneously by multiple threads.
- `LazyThreadSafetyMode.Publication` allows multiple executions of the initialization code by multiple threads. The first thread to complete the initialization code sets the value.

## Exceptions

In some cases an unhandled exception in the lazy initialization code will also cache returning an exception. See [https://docs.microsoft.com/en-us/dotnet/framework/performance/lazy-initialization#exceptions-in-lazy-objects](https://docs.microsoft.com/en-us/dotnet/framework/performance/lazy-initialization#exceptions-in-lazy-objects) which contains a table describing when this occurs.

## Additional info

If you're looking to explore further try these docs pages:

- [https://docs.microsoft.com/en-us/dotnet/api/system.lazy-1](https://docs.microsoft.com/en-us/dotnet/api/system.lazy-1)
- [https://docs.microsoft.com/en-us/dotnet/api/system.threading.lazythreadsafetymode](https://docs.microsoft.com/en-us/dotnet/api/system.threading.lazythreadsafetymode)
- [https://docs.microsoft.com/en-us/dotnet/framework/performance/lazy-initialization](https://docs.microsoft.com/en-us/dotnet/framework/performance/lazy-initialization)
