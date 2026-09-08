---
title: "Return 408 Request Timeout For a Regex Timeout Using ASP.NET Core Middleware"
pubDatetime: 2025-03-13T00:00:00-04:00
description: "Catch `RegexMatchTimeoutException` in ASP.NET Core middleware and convert an otherwise unhandled failure into HTTP 408."
tags: ["aspnetcore"]
---

Regular expression (regex) operations can be slow, especially if they cause catastrophic backtracking. This can consume significant web application resources. In cases where this isn't desired, it can be helpful to implement a default regex timeout (see [Setting Regex Timeout Globally Using .NET 6.0 With C#](/setting-regex-timeout-globally-using-dotnet-6_0-with-csharp/))

Additionally, we can implement ASP.NET Core middleware to return 408 Request Timeout (below), rather than let the expection be unhandled.

```csharp
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;

namespace NAMESPACE_HERE
{
    public class RegexTimeoutMiddleware
    {
        private readonly RequestDelegate _next;

        public RegexTimeoutMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (RegexMatchTimeoutException)
            {
                context.Response.StatusCode = StatusCodes.Status408RequestTimeout;
                await context.Response.WriteAsync("Operation timed out.");
            }
        }
    }

    public static class RegexTimeoutMiddlewareExtensions
    {
        public static IApplicationBuilder UseRegexTimeoutMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<RegexTimeoutMiddleware>();
        }
    }
}
```

Next, use it in Program.cs or Startup.cs:

```csharp
app.UseRegexTimeoutMiddleware();
```

Full example via test project: [https://github.com/kendaleiv/RegexTimeoutMiddleware](https://github.com/kendaleiv/RegexTimeoutMiddleware)
