---
layout: post
title: "IDisposable, IAsyncDisposable, and Tasks: Dispose Behavior With Tasks In C#"
tags: dotnet
---

While working with HTTP calls that return a `Stream` via `HttpClient`'s `var response = await SendAsync(request, HttpCompletionOption.ResponseHeadersRead);` -> `var stream = await response.Content.ReadAsStreamAsync();` method for efficient handling of streamed data [Brian Dunnington](https://twitter.com/briandunnington) identified the response should be disposed and pointed me to [https://www.stevejgordon.co.uk/using-httpcompletionoption-responseheadersread-to-improve-httpclient-performance-dotnet](https://www.stevejgordon.co.uk/using-httpcompletionoption-responseheadersread-to-improve-httpclient-performance-dotnet).

**Working through it I found disposing a `Task<T>` itself doesn't appear to call underlying `Dispose`/`DisposeAsync` methods on the generic `T`. Instead, the `T` itself, in this case a `Stream`, should be disposed.**

Also, [https://devblogs.microsoft.com/pfxteam/do-i-need-to-dispose-of-tasks/](https://devblogs.microsoft.com/pfxteam/do-i-need-to-dispose-of-tasks/) indicates that disposing of tasks is probably not necessary, but rather something to consider to meet performance goals. For what it's worth this post is dated in 2012, prior to the release of .NET Core.

## Example

```csharp
using System;
using System.Threading.Tasks;
                    
public class Program
{
    public static async Task Main()
    {
        //
        // IDisposable
        //
        
        var myDisposableTask = Task.FromResult(new MyDisposable());
        
        myDisposableTask.Dispose();
        
        MyDisposable myDisposable;
        
        using (myDisposable = await myDisposableTask)
        {
            Console.WriteLine("myDisposable.IsDisposed inside using: "
                + myDisposable.IsDisposed /* == False */);
        };
        
        Console.WriteLine("myDisposable.IsDisposed outside using: "
            + myDisposable.IsDisposed /* == True */);
        
        //
        // IAsyncDisposable
        //
        
        var myAsyncDisposableTask = Task.FromResult(new MyAsyncDisposable());
        
        myAsyncDisposableTask.Dispose();
        
        MyAsyncDisposable myAsyncDisposable;
        
        await using (myAsyncDisposable = await myAsyncDisposableTask)
        {
            Console.WriteLine("myAsyncDisposable.IsDisposed inside await using: "
                + myAsyncDisposable.IsDisposed /* == False */);
        }
        
        Console.WriteLine("myAsyncDisposable.IsDisposed outside await using: "
            + myAsyncDisposable.IsDisposed /* == True */);
    }
}

public class MyDisposable : IDisposable
{
    public bool IsDisposed { get; private set; }
    
    public void Dispose()
    {
        IsDisposed = true;
    }
}

public class MyAsyncDisposable : IAsyncDisposable
{
    public bool IsDisposed { get; private set; }

    public ValueTask DisposeAsync()
    {
        IsDisposed = true;
        
        return ValueTask.CompletedTask;
    }
}
```