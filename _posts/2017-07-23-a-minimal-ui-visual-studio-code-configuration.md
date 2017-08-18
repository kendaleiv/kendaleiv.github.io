---
layout: post
title: A Minimal UI Visual Studio Code Configuration
tags: vscode
---

How would you like to go from this:

[![](/assets/content/2017-07-23-a-minimal-ui-visual-studio-code-configuration/1.png)](/assets/content/2017-07-23-a-minimal-ui-visual-studio-code-configuration/1.png)

to this:

[![](/assets/content/2017-07-23-a-minimal-ui-visual-studio-code-configuration/2.png)](/assets/content/2017-07-23-a-minimal-ui-visual-studio-code-configuration/2.png)

Add the following to your settings, accessible by **File &rarr; Preferences &rarr; Settings**.

```json
{
    "editor.codeLens": false,
    "editor.minimap.enabled": false,
    "editor.renderIndentGuides": false,
    "window.menuBarVisibility": "toggle",
    "workbench.activityBar.visible": false,
    "workbench.colorTheme": "Default Light+",
    "workbench.iconTheme": null,
    "workbench.startupEditor": "newUntitledFile",
    "workbench.statusBar.visible": false
}
```

With the activity bar hidden, toggle **Explorer** using <kbd>Ctrl + Shift + E</kbd> and **Search** using <kbd>Ctrl + Shift + F</kbd>.

Press <kbd>Alt</kbd> to reveal the menu bar.

Note that this specifies the **Default Light+** color theme, which you can omit or change.

Let me know in the comments if you have any suggestions for improvements!

**Note:** This is targeting Visual Studio Code version `1.14.2`.
