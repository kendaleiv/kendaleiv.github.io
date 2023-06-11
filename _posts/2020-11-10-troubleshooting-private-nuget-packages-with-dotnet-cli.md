---
layout: post
title: Troubleshooting Private NuGet Packages With dotnet CLI
tags: dotnet
---

.NET now has a `dotnet` command line interface (CLI). Commands like `dotnet build` and `dotnet test` can be ran directly from the command line.

If you're working with private NuGet packages, that is *packages not available on the public nuget.org registry*, you may encounter some challenges using the dotnet CLI.

Here's a few items you may find helpful:

## Move nuget.config (if inside .nuget folder)

Private package sources may exist in the `nuget.config` file. If this file is located at `.nuget/nuget.config` (that is, inside a `.nuget` folder), the dotnet CLI may have difficulty finding and using it. Consequently, the dotnet CLI might be unable to locate a package.

**If you're having difficulty try moving the `nuget.config` file up a folder out of the `.nuget` folder.**

## Provide credentials (if needed)

In addition to the dotnet CLI knowing about the private NUGet package sources **the dotnet CLI may need credentials to access the private package registry**.

If you're working with Azure DevOps the [Azure Artifacts Credential Provider](https://github.com/Microsoft/artifacts-credprovider) is helpful. If you're using GitHub Packages try the [Configuring dotnet CLI for use with GitHub Packages](https://docs.github.com/en/free-pro-team@latest/packages/using-github-packages-with-your-projects-ecosystem/configuring-dotnet-cli-for-use-with-github-packages) documentation. If you're using another package registry try searching for a solution.

---

I hope this helps resolve any issues you're having, let me know if there's anything I've missed!
