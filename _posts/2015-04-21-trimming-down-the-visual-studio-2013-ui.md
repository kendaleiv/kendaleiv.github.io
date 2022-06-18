---
layout: post
title: Trimming Down the Visual Studio 2013 UI
tags: visual-studio ui
---

Here's Visual Studio Community 2013 General settings defaults:

[![](/assets/content/2015-04-21-trimming-down-the-visual-studio-2013-ui/VS2013-Community-General-700x394px.png)](/assets/content/2015-04-21-trimming-down-the-visual-studio-2013-ui/VS2013-Community-General.png)

If you want to simplify the UI, it's possible to turn it into this:

[![](/assets/content/2015-04-21-trimming-down-the-visual-studio-2013-ui/VS2013-Community-Web_Developer_(Code_Only)-Modified-700x394px.png)](/assets/content/2015-04-21-trimming-down-the-visual-studio-2013-ui/VS2013-Community-Web_Developer_(Code_Only)-Modified.png)

## Instructions

Here's how to achieve the trimmed down screenshot above:

- First, reset your settings with the **Web Development (Code Only)** settings.
    - Tools -> Import and Export Settings... -> Reset all settings -> No, just reset settings, overwriting my current settings *(or, save your existing settings if you'd like...)* -> **Web Development (Code Only)**
- If you prefer having **Solution Explorer** always visible, now is an OK time to Un-Auto Hide it.
- Next, hide the menu bar.
    - Install the **Hide Main Menu** Visual Studio extension. You can press <kbd>Alt</kbd> to reveal the menu bar when necessary.
- Now, you can download and import this [settings file](/assets/content/2015-04-21-trimming-down-the-visual-studio-2013-ui/Text-Editor-settings.vssettings) with Tools -> Import and Export Settings..., or you can do the following:
    - <small>Tools -> Options -> Environment -> General -> **Deselect "Show status bar"**</small>
	    - <small>You'll lose the ability to see the build status indicator on the status bar. You can view the build progress in the **Output window**, which you can open quickly with <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>o</kbd>.</small>
    - <small>Tools -> Options -> Text Editor -> General -> **Deselect "Selector margin"**</small>
    - <small>Tools -> Options -> Text Editor -> General -> **Deselect "Indicator margin"**</small>
        - <small>You'll lose the ability to click the indicator margin area to set and remove breakpoints. You can press <kbd>F9</kbd> as a substitute, or right click -> Breakpoint context menu item.</small>
    - <small>Tools -> Options -> Text Editor -> All Languages -> General -> **Deselect "Navigation bar"**</small>
    - <small>Tools -> Options -> Text Editor -> All Languages -> Scroll Bars -> **Deselect "Show annotations over vertical scroll bar"**</small>
    - <small>Tools -> Options -> Text Editor -> C# -> Advanced -> **Deselect "Enter outlining mode when files open"**</small>

## Final notes

At this point you may want to perform your own customizations. You may prefer to enable line numbers, or have your test runner always visible.

As new items like **Error List** appear during usage, you can decide what to do with them.

Also, if you prefer having items visible that use significant space, consider using **Full Screen** as a view that doesn't contain those items when you need additional real estate. You can toggle it with <kbd>Shift</kbd>+<kbd>Alt</kbd>+<kbd>Enter</kbd> or with View -> Full Screen on the main menu.
