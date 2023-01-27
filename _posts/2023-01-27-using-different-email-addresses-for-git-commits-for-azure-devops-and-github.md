---
layout: post
title: Using Different Email Addresses For Git Commits For Azure DevOps And GitHub
tags: git
---

If you work with [Azure DevOps](https://azure.microsoft.com/en-us/products/devops/) and [GitHub](https://github.com/) with different email addresses you may want to align your commit email addresses with the email addresses on your accounts.

**We can do this automatically via `~/.gitconfig`:** *(edit this file in your home directory or create it if it does not exist)*

```
[user]
  name = Your Name
  email = YourGitHubEmail@example.com
[includeIf "hasconfig:remote.*.url:*@*dev.azure.com**"]
  [user]
    email = YourAzureDevopsEmail@example.com
```

This defaults to the GitHub email address and specifies a different email address for Azure DevOps. This should work for both HTTPS and SSH.
