---
layout: post
title: We Replaced a Multi-Application Home-Grown Authentication System
tags: authentication
---

On June 9, 2016 I had an amazing opportunity to deliver a talk bearing the name of this post title at [NDC Oslo](https://ndcoslo.com/). An embed of the video is at the end of this post.

Here's a write-up:

## Where We Started

The existing implementation had two primary tenets:

- Centralized authentication
- Per-application authorization

The prior solution was built on top of ASP.NET Forms Authentication, but enhanced to include centralized authentication, impersonation functionality, and a basis for per-application authorization.

**We kept these primary tenets intact with the replacement rollout.**

## Our rationale

Our main goals included supporting new scenarios and using a modern specification.

Our desired immediate and future login possibilities included Active Directory logins, social logins, as well as a login story for SPA and other applications.

In terms of following a specification, we chose [OpenID Connect](https://openid.net/connect/). 

## Exploring choices

We explored different choices for implementing our desired feature set. It ultimately boiled down to choosing from the following:

- ~~Write it yourself~~ *(not an actual solution for many developers and teams...)*
- Find a good and reliable open source implementation
- Use an online service

We chose to cloud host an open source implementation using [IdentityServer3](https://github.com/IdentityServer/IdentityServer3) and [BrockAllen.MembershipReboot](https://github.com/brockallen/BrockAllen.MembershipReboot).

## Implementation

Now that a decision has been made, it's time to get moving. I'll caution you: **It's going to look easy.** Diagrams like this one can lure you into a false sense of *you-think-you-know-what-you're-doing*:

![https://identityserver.github.io/Documentation/assets/images/terminology.png](https://identityserver.github.io/Documentation/assets/images/terminology.png)

**Diagram:** *[https://identityserver.github.io/Documentation/assets/images/terminology.png](https://identityserver.github.io/Documentation/assets/images/terminology.png) on [https://identityserver.github.io/Documentation/docsv2/overview/terminology.html](https://identityserver.github.io/Documentation/docsv2/overview/terminology.html)*

Now, start thinking and implementing. You may realize you don't know what to do, or even where to begin. If that's the case -- it's totally OK. These diagrams are great for a high-level understanding, but you'll need a much deeper understanding to be able to implement this.

As for us, we got expert help: An on-site consultant for one week to rocket the project forward quickly. This was highly valuable for our team.

### Making it easy: Abstraction(s)

You'll likely want to create an abstraction or abstractions for use in applications as a *standard* way to wire up the authentication/authorization solution. A consistent, easy to use abstraction can be useful!

**You choose the abstraction(s)!** And, how to distribute them.

An example abstraction could look something like this:

```csharp
[assembly: OwinStartup(typeof(TheApp.Startup))]
public class Startup
{
    public void Configuration(IAppBuilder app)
    {
        var config = TheOrgConfiguration.GetFromAppSettings();

        app.UseStandardTheOrgAuthWithRoles(config, currentUser =>
        {
            // Return roles for `currentUser`
        });
    }
}
```

### Unfriendly by design

Authentication and authorization is unfriendly by design. No *hints* are given if 15 characters of a 16 character password or correct. It's just *nope*. Having logging in place to help you as a developer or sysadmin discover the *real* underlying problems (scope problems, etc.) could go a long way.

### Configuration, configuration, configuration

Configuration plays a strong role in an authentication and authorization solution working as expected or not. **A simple misconfiguration can cause huge problems.**

When it comes to configuration: **Prefer less to more**. Combine and simplify configuration where possible. If there's a configuration setting you never expect to change, consider hardcoding it. Even if you do change it in the future -- it's a quick deployment. Not having to deal with it over time may be an overall win.

Limit visiblity of secrets to those who should be able to access them. If a team member doesn't have full production environment access, they shouldn't be able to get a production environment secret, either.

### Logging

Logging can be helpful if things don't go as planned. If there's an issue in production, having more information at hand may help you discover the root problem more quickly. Ideally, any logging strategy makes it easy to find what you're looking for, without having to sift through a bunch of non-applicable items.

If you're logging unhandled exceptions or other events, consider filtering or removing items that aren't *real* problems. A user providing bad input and other errors-that-aren't-necessarily-errors can dilute your error logs if left unchecked.

## Impersonation

I took a deep dive into impersonation in terms of demo'ing [Stuntman](https://rimdev.io/stuntman), an open source ASP.NET library for runtime user impersonation/selection. Here's what Stuntman can do for you in a browser:

![https://cloud.githubusercontent.com/assets/1012917/10737939/5154bbdc-7beb-11e5-87dd-979c4e8cb3c0.gif](https://cloud.githubusercontent.com/assets/1012917/10737939/5154bbdc-7beb-11e5-87dd-979c4e8cb3c0.gif)

I also demo'ed usage of an access token configured for a user in Stuntman with Fiddler and an `Authorization: Bearer the_access_token` request header.

## Video

And, here's the video:

<iframe src="https://player.vimeo.com/video/171704608" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
