---
title: "Quickstart for Contributing to a GitHub Repository with a Development Branch"
pubDatetime: 2014-09-29T00:00:00-04:00
description: "Fork, clone, and contribute to a GitHub repository that uses a development branch instead of its default branch."
tags: ["git", "github"]
---

Are you an eager GitHub user who wants to contribute to a repository that uses a development branch, but aren't familiar with getting started without committing to master? No worries, here we go!

## Getting started

First, fork the [kendaleiv/development-branch-master-as-default](https://github.com/kendaleiv/development-branch-master-as-default) repository _(or, substitute a repository of your choice)_. In this repository the _master_ branch is set as the default branch.

Next, run the following:

```
git clone git@github.com:your-username-here/development-branch-master-as-default.git
cd .\development-branch-master-as-default
git branch
```

Git will only setup the GitHub defined default branch locally during the clone process. If `git branch` reports your current branch is _development_ (the starred branch is the current branch), you're good to start committing against _development_. If that is the case, you may want to set the _upstream_ remote at this time, too.

If your current branch is _master_, run the following:

```
git remote add upstream git@github.com:kendaleiv/development-branch-development-as-default.git
git fetch upstream
git checkout -b development upstream/development
```

You should now be on the _development_ branch locally.

## Further notes

You can discover what the default branch is for a repository by navigating to the repository on GitHub. If you navigate to [kendaleiv/development-branch-master-as-default](https://github.com/kendaleiv/development-branch-master-as-default) you'll see the _master_ branch is initially shown. For comparison, [kendaleiv/development-branch-development-as-default](https://github.com/kendaleiv/development-branch-development-as-default) initially shows the _development_ branch.

Also, remember to follow any guidelines for contributing, if they exist. This may include code style expectations, directions for submitting pull requests, and other guidance you should follow when contributing.
