---
layout: post
title: Quickstart for Creating a Library Using the .NET Core CLI
tags: dotnet dotnetcore
---

The .NET Core CLI enables quickly scaffolding a new library. Here's a quickstart of commands to use, substituting `My.Sample.Project` for your own new project:

```
dotnet new --update-apply
mkdir My.Sample.Project
cd My.Sample.Project
dotnet new sln
mkdir src
cd src
mkdir My.Sample.Project
cd My.Sample.Project
dotnet new classlib
cd ../..
mkdir tests
cd tests
mkdir My.Sample.Project.Tests
cd My.Sample.Project.Tests
dotnet new xunit
dotnet add reference ../../src/My.Sample.Project/My.Sample.Project.csproj
cd ../..
dotnet sln add ./src/My.Sample.Project/My.Sample.Project.csproj
dotnet sln add ./tests/My.Sample.Project.Tests/My.Sample.Project.Tests.csproj
```

It's all setup with a test project to begin your new library!

Consider adding a build script for continuous integration, .gitignore, .editorconfig, LICENSE, and a README.md too!
