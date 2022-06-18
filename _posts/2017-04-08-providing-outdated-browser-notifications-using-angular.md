---
layout: post
title: Providing Outdated Browser Notifications Using Angular
tags: angular
---

[Browser-Update.org](https://browser-update.org/) is useful for notifying users about an outdated web browser. In the case of SPA applications, the experience using an older browser can range from great to completely broken.

If you're using Angular (version 2 and later), you may be searching for an Angular specific solution for this. However, a JavaScript error while loading an Angular application due to an unsupported browser could stop the outdated browser notification from running!

## Recommendation

Include the JavaScript snippet from [Browser-Update.org](https://browser-update.org/) immediately before the `</body>` closing tag, either inline or in a `.js` file *([Content Security Policy (CSP)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) requirements may require using an external file)*. When using the [Angular CLI](https://cli.angular.io/), the [Browser-Update.org](https://browser-update.org/) script will run immediately before the Angular application's JavaScript.

**Note:** You may want to adjust the notifications settings for the [Browser-Update.org](https://browser-update.org/) JavaScript snippet.
