---
title: "Integrating Google Chrome With KeePass Using chromeIPass and KeePassHttp"
pubDatetime: 2015-10-14T00:00:00-04:00
description: "Connect Google Chrome to KeePass using KeePassHttp and chromeIPass."
tags: ["chrome", "keepass", "chromeipass", "keepasshttp"]
---

Having browser integration with [KeePass](https://keepass.info/) can be helpful, and can be accomplished with Google Chrome using [KeePassHttp](https://github.com/pfn/keepasshttp) and **chromeIPass**.

Here's how:

## Install KeePassHttp

You can install [KeePassHttp](https://github.com/pfn/keepasshttp) on Windows using [Chocolatey](https://chocolatey.org/) and  
`choco install keepass-keepasshttp` from an Administrator cmd or PowerShell prompt.

If you had [KeePass](https://keepass.info/) open during the installation, you'll want to restart it to begin using the [KeePassHttp](https://github.com/pfn/keepasshttp) plugin.

_If you're running OS X or Linux, or prefer to not use [Chocolatey](https://chocolatey.org/) on Windows, refer to the directions at [https://github.com/pfn/keepasshttp](https://github.com/pfn/keepasshttp)._

## Install chromeIPass

**chromeIPass** is a Google Chrome plugin designed to work with [KeePassHttp](https://github.com/pfn/keepasshttp). You can install it from [https://chrome.google.com/webstore/detail/chromeipass/ompiailgknfdndiefoaoiligalphfdae](https://chrome.google.com/webstore/detail/chromeipass/ompiailgknfdndiefoaoiligalphfdae).

## Quick setup

After everything is installed, click on the icon for the **chromeIPass** extension in Google Chrome, then click on the **Connect** button. Now, complete the connection procedure in [KeePass](https://keepass.info/).

That concludes this quick how-to, enjoy!
