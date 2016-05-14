---
layout: post
title: Displaying DateTime in Browser Time Zone in ASP.NET Razor Views
tags: aspnet razor datetime browser time zone
---

In some applications, it's important to display date and time information in the user's expected time zone. One option is storing time zone preference information as part of a user's account information. If this is not possible or you choose not to do so, if it's a web application you can rely on the current time zone information from the user's web browser.

If you're using ASP.NET, this can be done via Razor views using [RimDev.AspNetBrowserLocale](https://github.com/ritterim/AspNetBrowserLocale).

First, install the [RimDev.AspNetBrowserLocale](https://www.nuget.org/packages/RimDev.AspNetBrowserLocale/) NuGet package.

Next, assuming you're using the Razor view engine, initialize as follows in **_Layout.cshtml** or another file:

```
@Html.InitializeLocaleDateTime()
```

Now, you can use it from Razor:

```
@{
    var myDateTime = new DateTime(2015, 1, 1);
}

@Html.BrowserDisplay(myDateTime)
```

JavaScript is used to display the information in the user's time zone. Also, you'll need a `@using RimDev.AspNetBrowserLocale` or equivalent for the above code examples.

Hopefully this helps you solve this problem, in cases where you don't want to collect or store the user's preferred time zone information.
