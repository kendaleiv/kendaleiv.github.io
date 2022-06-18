---
layout: post
title: Leniently Parse Comma Separated Configuration Values Using C#
tags: dotnet dotnetcore
---

Whether you're running .NET full framework or .NET Core sometimes you may want to read configuration values at runtime. Sometimes the value might look like `"a,b,c"`, which some might write as `"a, b, c"`. **When configuration values are comma separated or delimited in some manner it's a good idea to be forgiving when reading the input**.

```csharp
var values = stringValue
    ?.Split(new[] { "," }, StringSplitOptions.RemoveEmptyEntries)
    .Select(x => x?.Trim())
    .Where(x => !string.IsNullOrWhiteSpace(x))
    ?? new List<string>();
```

Or, as extension methods:

```csharp
public static class StringExtensions
{
    public static IEnumerable<string> LenientlyParseDelimited(this string str)
    {
        return LenientlyParseDelimited(str, new[] { "," });
    }

    public static IEnumerable<string> LenientlyParseDelimited(this string str, params string[] delimiters)
    {
        if (delimiters == null) throw new ArgumentNullException(nameof(delimiters));

        return str
            ?.Split(delimiters, StringSplitOptions.RemoveEmptyEntries)
            .Select(x => x?.Trim())
            .Where(x => !string.IsNullOrWhiteSpace(x))
            ?? new List<string>();
    }
}
```

This approach parses the input leniently by removing empty and whitespace only entries while trimming whitespace on each split value. This can be helpful since an unexpected space character could cause an issue. You could even add additional delimiters like `';'` to the array.

**Configuration problems can be a frustrating source of deployment issues. Leninently parsing delimited strings might just save you from a production issue.**
