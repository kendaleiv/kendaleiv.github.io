---
layout: post
title: Comparing Template Versions For Azure Resource Manager (ARM), Bicep, or Terraform Using Azure
tags: azure arm bicep terraform
---

When deployed resources to Azure the recommended Azure Resource Manager (ARM) guidance is to hardcode the latest version when creating a resource and only updating it if needed per [https://learn.microsoft.com/en-us/azure/azure-resource-manager/templates/best-practices#api-version](https://learn.microsoft.com/en-us/azure/azure-resource-manager/templates/best-practices#api-version). **However, if you need functionality only offered by a newer version, it's time to update to a newer apiVersion.**

As a start, we can compare the schema of different versions to view the differences.

## Comparing schemas

Using Cosmos DB as an example, we can compare difference versions by opening multiple tabs in Visual Studio Code and using `> File: Compare New Untitled Text Files` in the search bar and pasting the schemas of versions to compare *(or, use another diff tool)*.

For example, we can compare the ARM schemas of [Microsoft.DocumentDB databaseAccounts 2023-04-15](https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2023-04-15/databaseaccounts?pivots=deployment-language-arm-template) and [Microsoft.DocumentDB databaseAccounts 2023-11-15](https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/2023-11-15/databaseaccounts?pivots=deployment-language-arm-template) and see the apiVersion changed and 2 properties were added.

You can also compare the Bicep or Terraform schemas if you prefer.

Cosmos DB also publishes a change log for reference: [https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/change-log/databaseaccounts](https://learn.microsoft.com/en-us/azure/templates/microsoft.documentdb/change-log/databaseaccounts).

## In closing

Hope that helps navigate the first step of a necessary apiVersion update! **While it's not a guarantee there isn't a behavior change, comparing schemas can be a good first step.**
