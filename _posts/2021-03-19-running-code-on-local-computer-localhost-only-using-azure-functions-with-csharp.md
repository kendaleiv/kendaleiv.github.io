---
layout: post
title: Running Code On Local Computer / Localhost Only Using Azure Functions With C#
tags: azure-functions csharp
---

[Azure Functions](https://docs.microsoft.com/en-us/azure/azure-functions/functions-overview) is a serverless hosting offering available in Microsoft Azure. While authoring code you may find a need to run code only during local development.

Azure Functions provides an [`AZURE_FUNCTIONS_ENVIRONMENT`](https://docs.microsoft.com/en-us/azure/azure-functions/functions-app-settings#azure_functions_environment) environment variable that can help! *(Note: Per the documentation it seems to be a version 2.x and later feature, I couldn't find a reference to it in [https://github.com/Azure/azure-functions-host/tree/v1.x](https://github.com/Azure/azure-functions-host/tree/v1.x))*

```csharp
var isLocal = Environment
    .GetEnvironmentVariable("AZURE_FUNCTIONS_ENVIRONMENT")
    ?.Equals("development", StringComparison.OrdinalIgnoreCase) == true;
```

This is particularly useful over the `#if DEBUG` preprocessor directive if you want the code to run the same as local when running on a build agent in a Release configuration.

Hope that helps!
