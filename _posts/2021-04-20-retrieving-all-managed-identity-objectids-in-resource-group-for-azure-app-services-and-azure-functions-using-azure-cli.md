---
layout: post
title: Retrieving All Managed Identity ObjectIds In Resource Group For Azure App Services And Azure Functions Using Azure CLI
tags: azure azure-cli
---

If you're working with Azure App Services, Azure Functions, or perhaps another Azure service that implements [managed identity](https://learn.microsoft.com/en-us/azure/active-directory/managed-identities-azure-resources/) in the same way it can be useful to get a list of the object ids for an entire resource group. **One way we can accomplish this is using the [Azure CLI](https://learn.microsoft.com/en-us/cli/azure/).**

## Setup

[Install the Azure CLI](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli) if it's not already installed.

If you aren't currently logged in with Azure CLI run:

```
> az login
```

Next, switch to the subscription you want to target. Alternatively, pass the `--subscription` parameter as needed when retrieving objectIds.

```
> az account set --subscription name_or_id_of_subscription
```

## Retrieving ObjectIds

Now, you're ready to get the objectIds!

```
> az resource list -g myresourcegroup --query "[?identity!=null].{name: name, objectIds: identity.principalId}" --output table
Name                      ObjectIds
------------------------  ------------------------------------
myservice-eastus          00000000-0000-0000-0000-000000000001
myservice-westus          00000000-0000-0000-0000-000000000003
myservice-eastus/staging  00000000-0000-0000-0000-000000000002
myservice-westus/staging  00000000-0000-0000-0000-000000000004
```

If you're looking for a comma separated value:

```
> az resource list -g myresourcegroup --query "[?identity!=null].identity.principalId | {objectIds: join(',', @)}"
{
  "objectIds": "00000000-0000-0000-0000-000000000001,00000000-0000-0000-0000-000000000003,00000000-0000-0000-0000-000000000002,00000000-0000-0000-0000-000000000004"
}
```
