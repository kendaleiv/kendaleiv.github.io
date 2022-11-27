---
layout: post
title: Retrieving ObjectIds In An Azure Active Directory Group Using Azure CLI
tags: azure azure-cli
---

Using [Azure CLI](https://learn.microsoft.com/en-us/cli/azure/) we can retrieve a list of objectIds in a Azure Active Directory group.

## Setup

[Install the Azure CLI](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli) if it's not already installed.

If you aren't currently logged in with Azure CLI run:

```
az login
```

## Retrieving ObjectIds

Now, you're ready to get the objectIds!

```
az ad group member list --group "GROUP_NAME_HERE" --query "[].{displayName: displayName, userPrincipalName: userPrincipalName, objectId: objectId}" --output table
DisplayName  UserPrincipalName  ObjectId
-----------  -----------------  ------------------------------------
Test User 1  test1@example.com  00000000-0000-0000-0000-000000000001
Test User 2  test2@example.com  00000000-0000-0000-0000-000000000002
```

If you're looking for a comma separated value:

```
az ad group member list --group "GROUP_NAME_HERE" --query "[].objectId | {objectIds: join(',', @)}"
{
  "objectIds": "00000000-0000-0000-0000-000000000001,00000000-0000-0000-0000-000000000002"
}
```
