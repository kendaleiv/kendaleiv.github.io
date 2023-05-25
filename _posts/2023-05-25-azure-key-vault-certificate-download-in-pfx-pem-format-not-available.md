---
layout: post
title: "Azure Key Vault: Certificate \"Download in PFX/PEM format\" not available"
tags: azure
---

One piece of functionality [Azure Key Vault](https://learn.microsoft.com/en-us/azure/key-vault/) provides is certificates. Sometimes you may want to download the certificate. There's an open to **Download in CER Format** that retrieves the public key only. If you're looking for the private key use the **Download in PFX/PEM format** option.

However, what if the **Download in PFX/PEM format** option is unavailable?

## Solution

You'll need **Secret: Get** permission to download the private key, which is different from certificate permissions.

---

Also, if you're looking to download the private key it needs to be exportable. See [https://learn.microsoft.com/en-us/azure/key-vault/certificates/about-certificates#exportable-or-non-exportable-key](https://learn.microsoft.com/en-us/azure/key-vault/certificates/about-certificates#exportable-or-non-exportable-key) for more details.
