---
layout: post
title: "Peas&Carrots: The Importance Of Url Encoding Query String Parameters"
tags: web
---

When creating web applications it's common to create links. Sometimes, links contain query string parameters. Google uses the `?q=` query string parameter for search queries. **An issue can arise when query string values contain characters that have special meanings.**

For instance, the `&` character separates different query string items, while `=` separates keys and values like `?q=peas`. If these characters are part of query string values, like `?q=peas&carrots`, `carrots` can be interpreted as the name of the next item in the query string, rather than part of the value of `q`.

Here's the problem demonstrated:

```js
new URLSearchParams('https://example.com?q=peas&carrots')
  .has('carrots'); // true, but we want this to be false
```

## Resolution

You can make the characters safe for a url by url encoding the query string values *(as well as the keys, if necessary)*. With JavaScript we can do this as follows:

```js
`https://example.com?q=${encodeURIComponent('peas&carrots')}`;
  // "https://example.com?q=peas%26carrots"

new URLSearchParams(`https://example.com?q=${encodeURIComponent('peas&carrots')}`)
  .has('carrots'); // false, which is what we want
```

The `&` was transformed to `%26`, making it safe for a url.

For non-JavaScript cases follow the guidance of your specific use case. For example, with ASP.NET (both .NET Framework and .NET Core) you can use [`WebUtility.UrlEncode(string)`](https://docs.microsoft.com/en-us/dotnet/api/system.net.webutility.urlencode).

## Note

Some frameworks and libraries may do this automatically. But, if it's not happening automatically it should be handled manually. If you're not sure, try it out with `peas&carrots`!
