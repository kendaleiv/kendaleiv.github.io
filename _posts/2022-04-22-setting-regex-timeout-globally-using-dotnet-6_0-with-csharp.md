---
layout: post
title: Setting Regex Timeout Globally Using .NET 6.0 With C#
tags: dotnet
---

.NET 6.0 allows the global regular expression (regex) timeout to be configured. By default, the global timeout is [`Regex.InfiniteMatchTimeout`](https://learn.microsoft.com/en-us/dotnet/api/system.text.regularexpressions.regex.infinitematchtimeout?view=net-6.0) and regex operations will run until completion.

If a timeout is exceeded [`System.Text.RegularExpressions.RegexMatchTimeoutException`](https://learn.microsoft.com/en-us/dotnet/api/system.text.regularexpressions.regexmatchtimeoutexception?view=net-6.0) will be thrown.

## Setting the global regex timeout

This will set the default regex timeout to 2 seconds:

```csharp
// https://learn.microsoft.com/en-us/dotnet/api/system.text.regularexpressions.regex.matchtimeout?view=net-6.0#remarks
AppDomain.CurrentDomain.SetData("REGEX_DEFAULT_MATCH_TIMEOUT", TimeSpan.FromSeconds(2));
```

**This needs to happen as early as possible *(first statement in `Main` would work)*, prior to any usage of `Regex` that causes this value to be read and cached. Once it's cached it cannot be changed without restarting the application.** *(see **Runtime implementation** below)*

We can verify it's working via:

```csharp
var regexDefaultMatchTimeout = AppDomain.CurrentDomain.GetData("REGEX_DEFAULT_MATCH_TIMEOUT") as TimeSpan?;
if (regexDefaultMatchTimeout != null)
{
    var regexMatchTimeout = new Regex("abc").MatchTimeout;
    if (regexDefaultMatchTimeout != regexMatchTimeout)
    {
        throw new ApplicationException("MatchTimeout is not set from REGEX_DEFAULT_MATCH_TIMEOUT.");
    }
}

Console.WriteLine(regexDefaultMatchTimeout);
```

## Why set a global timeout?

Regular expressions could be used by an attacker to launch a denial-of-service attack for a website by consuming excessive resources. Setting a timeout allows the operation to stop at a configured timeout, rather than running until completion, using resources the entire time.

## Application code / library code

If you're writing application code be careful with negatively impacting dependencies via a regex timeout.

---

If you're writing library code to be used by other applications and want a specific regex timeout it should probably be handled internally by manually specifying the timeout values for each regex call, rather than using a default value.

Example:

```csharp
Regex.IsMatch("abc", "a", RegexOptions.None, TimeSpan.FromSeconds(5));
```

## Runtime implementation

Here's the .NET 6.0 implementation: [https://github.com/dotnet/runtime/blob/release/6.0/src/libraries/System.Text.RegularExpressions/src/System/Text/RegularExpressions/Regex.Timeout.cs#L31](https://github.com/dotnet/runtime/blob/release/6.0/src/libraries/System.Text.RegularExpressions/src/System/Text/RegularExpressions/Regex.Timeout.cs#L31)
