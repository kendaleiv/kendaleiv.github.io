---
layout: post
title: Retrieving Managed Identity Access Tokens For Azure Web Apps Using PowerShell Console
tags: azure powershell
---

If you're working with Azure Web Apps and securing between services using managed identity, formerly known as Managed Service Identity (MSI), it can be useful to retrieve an access token on behalf of an application. We can accomplish this via PowerShell.

## Credit

This is adapted from [https://techcommunity.microsoft.com/t5/azure-developer-community-blog/understanding-azure-msi-managed-service-identity-tokens-caching/ba-p/337406](https://techcommunity.microsoft.com/t5/azure-developer-community-blog/understanding-azure-msi-managed-service-identity-tokens-caching/ba-p/337406) authored by Stephane Eyskens ([@stephaneeyskens](https://twitter.com/stephaneeyskens)), big thanks for sharing this!

## Code

Update the resource of `https://management.azure.com/` as needed for your use case and paste into a PowerShell prompt:

```powershell
$ProgressPreference="SilentlyContinue"
$secret = (get-item env:MSI_SECRET).value
$endpoint = (get-item env:MSI_ENDPOINT).value
$headers = @{Secret = "$($secret)"}
$req=Invoke-WebRequest -UseBasicParsing -Uri "$($endpoint)?api-version=2017-09-01&resource=https://management.azure.com/" -Headers $headers|ConvertFrom-JSON
$req
$req.access_token
```

You can access a PowerShell prompt via `https://your-app-name.scm.azurewebsites.net/DebugConsole/?shell=powershell` *(replace `your-app-name`)*.
