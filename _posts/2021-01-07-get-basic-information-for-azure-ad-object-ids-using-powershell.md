---
layout: post
title: Get Basic Information For Azure AD Object Ids Using PowerShell
tags: azure powershell
---

## Quick summary

```powershell
> Get-AzureADObjectByObjectId -ObjectIds 00000000-0000-0000-0000-000000000000
```

Comma delimit for multiples.

## Details

If you're working with Azure you may find yourself needing to get information about one or many Azure AD object ids. **Here's how to get basic information without having to specify the type of the entity:**

1. [Install Azure Active Directory PowerShell for Graph](https://docs.microsoft.com/en-us/powershell/azure/active-directory/install-adv2) if it's not already installed. `Install-Module AzureAD` uses the PowerShell Gallery to install the [AzureAD](https://www.powershellgallery.com/packages/AzureAD) module.

1. Connect via `Connect-AzureAD`. Note: The terminal in Visual Studio Code may have an issue here, if it's not loading the login screen try launching standalone PowerShell.

1. Use `Get-AzureADObjectByObjectId -ObjectIds 00000000-0000-0000-0000-000000000000` where `00000000-0000-0000-0000-000000000000` is an example object id (replace it with your own, to add multiples delimit with a comma like `-ObjectIds abc,def`)

Hope that helps!
