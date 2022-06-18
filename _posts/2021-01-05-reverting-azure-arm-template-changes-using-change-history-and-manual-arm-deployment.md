---
layout: post
title: Reverting Azure ARM Template Changes Using Change History And Manual ARM Deployment
tags: azure
---

I made some ARM templates changes and unintentionally removed Access Policy items from an Azure Key Vault in a (thankfully) non-production environment. Since the ARM template doesn't have the *before* state in the repository, reverting the pull request isn't going to fix it.

However, we can get the before state of the template using **Change history** on the **Activity log** viewable on the Azure portal.

## Change history

We can use [Change history](https://docs.microsoft.com/en-us/azure/azure-monitor/platform/activity-log#view-change-history) to see the *before* state of the ARM template. Copy paste the before state into a code editor. You may find it useful to run a [ARM template deployment what-if operation](https://docs.microsoft.com/en-us/azure/azure-resource-manager/templates/template-deploy-what-if?tabs=azure-powershell) to verify the template before proceeding. You may need to work with it a bit to get it in a working state.

## Applying ARM template

To manually publish the ARM template to Azure, see [The "Edit and deploy the template" anchor on "Quickstart: Create and deploy ARM templates by using the Azure portal"](https://docs.microsoft.com/en-us/azure/azure-resource-manager/templates/quickstart-create-templates-use-the-portal#edit-and-deploy-the-template).

## In Closing

I hope this is helpful if you find yourself needing to revert like I did.
