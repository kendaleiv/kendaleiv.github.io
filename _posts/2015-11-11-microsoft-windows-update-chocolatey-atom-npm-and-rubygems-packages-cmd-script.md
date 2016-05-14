---
layout: post
title: 'Microsoft Windows: Update Chocolatey, Atom, npm, and RubyGems packages cmd Script'
tags: windows update packages
---

Looking for a way to update various packages in your Windows environment? Use the script below running as Administrator *(Administrator is needed for Chocolatey, at least)*, editing as necessary for your needs.

**Note:** This cmd script is unprompted with no opportunity for review.

## update-packages.cmd

```
@echo off

echo.
echo ## Chocolatey packages
echo.

call choco upgrade all -y

echo.
echo ## Atom packages
echo.

call apm upgrade --no-confirm

echo.
echo ## npm packages
echo.

call npm update -g

echo.
echo ## RubyGems
echo.

call gem update
```

This will handle updates for Chocolatey, Atom, npm, and RubyGems packages.

Feel free to use and adapt this cmd script for your needs. Happy updating!
