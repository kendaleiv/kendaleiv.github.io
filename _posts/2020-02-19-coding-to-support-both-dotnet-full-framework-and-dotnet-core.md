---
layout: post
title: Coding To Support Both .NET Full Framework and .NET Core
tags: dotnet dotnetcore
---

Sometimes when writing .NET libraries we want to support .NET Full Framework, as well as .NET Core. In many cases the functionality is the same, but sometimes it is different.

For the cases where functionality needs to be different there's two main concerns:

## Different code paths

In many cases the code between .NET Full Framework and .NET Core can be the same for both target frameworks. But, for the cases it needs to be different we can use `#if` / `#endif` preprocessor directives to specify when code should be used.

```csharp
using System;
using Dependency.For.Both.Target.Frameworks;

#if NETSTANDARD2_0
using Dependency.For.NETSTANDARD2_0.Only;
#endif

#if NET462
using Dependency.For.NET462.Only;
#endif

namespace MyLibrary
{
    public class MyClass
    {
        public void Run()
        {
#if NETSTANDARD2_0
            Console.WriteLine("netstandard2.0 only");
#endif

#if NET462
            Console.WriteLine(".NET Full Framework only");
#endif

            Console.WriteLine("Both target frameworks");
        }
    }
}
```

You can get as creative with this technique as you'd like, including constructor parameters. You can wrap entire files with `#if NET462` / `#endif` even!

## Different dependencies *(NuGet packages)*

Sometimes you may need different NuGet packages to handle a specific target framework only. We can use a `Condition` to scope `PackageReference` items to specific target frameworks.

See example **MyPackage.csproj**:

```xml
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <TargetFrameworks>netstandard2.0;net462</TargetFrameworks>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Something.For.Both.Full.Framework.And.DotnetCore" Version="1.0.0" />
  </ItemGroup>

  <ItemGroup Condition="'$(TargetFramework)' == 'netstandard2.0'">
    <PackageReference Include="Something.For.DotNetCore.Only" Version="1.0.0" />
  </ItemGroup>

  <ItemGroup Condition="'$(TargetFramework)' == 'net462'">
    <PackageReference Include="Something.For.Full.Framework.Only" Version="1.0.0" />
  </ItemGroup>

</Project>
```

## Summary

Writing code to support .NET Full Framework and .NET Core can bring about some extra work, but in cases where you need or want to support both this can help!
