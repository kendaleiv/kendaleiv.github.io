---
layout: post
title: Can We Make Some Changes First? Pull Requesting a GitHub Pull Request
tags: github
---

Pull request contributions are awesome. But, sometimes prior to merge there's a few things you'd like changed -- or, perhaps more than a few. As a reviewer, if you feel like your being too picky but want a number of changes made prior to merge, **submitting a pull request to a pull request branch can be a nice gesture. It shows you're willing to put forth the effort for the changes you're desiring.**

## How

Here's a few commands to get you on your way. Note that `REMOTE_NAME` refers to the name of the new remote being added. This can be anything. You may want to make it their GitHub username, or something else.

```
> git remote add REMOTE_NAME CONTRIBUTOR_REPOSITORY_URL
> git fetch REMOTE_NAME
> git checkout -b REMOTE_NAME-the-pull-request-branch REMOTE_NAME/the-pull-request-branch
> git checkout -b suggestions-for-the-pull-request
```

Make and commit any changes, then:

```
> git push origin suggestions-for-the-pull-request
```

Now, create a pull request on GitHub, targeting the fork and branch the contributor made their pull request from.

After the pull request is made, you may want to write a short explanation if the contributor is potentially unfamiliar with this practice.

## In closing

If the contributor agrees to merge your suggested changes, then everything is merged exactly as you like. And, the contributor feels valued in that you went out of your way to modify their pull request to help it meet your standards. Basically, **you did some work in response to their work -- demonstrating that you're willing to put some effort in as well**.

Sometimes, creating a pull request targeting a pull requested branch might be just what you're looking for to get everything fixed up perfectly and make it a positive experience for a contributor.
