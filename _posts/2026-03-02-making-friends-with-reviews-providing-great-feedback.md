---
layout: post
title: "Making Friends with Reviews: Providing Great Feedback"
tags: code-review
---

<iframe style="max-width: 100%; height: auto; aspect-ratio: 16 / 9;" src="https://www.youtube.com/embed/9s5Mr73hc3Q?si=ikOGpjij0ea7jxBp" title="Making Friends with Reviews: Providing Great Feedback - Conference Talk" frameborder="0" allowfullscreen></iframe>

**The following is an AI generated summary of a talk I gave:**

The title of this post has two meanings. First, you're doing a great job with reviews -- reviewing code, making necessary changes, and asking necessary questions. But, there's also the relationship side: forming positive bonds with the people you work with.

## Why reviews matter

Imagine joining a new team. You're excited to contribute, but also nervous. You work really hard on your first pull request, submit it, and receive a not-so-great review experience. **That might lead to not wanting to contribute -- or being scared to contribute in the future for fear of making mistakes and being made to feel bad about it.** For open source, the contributor might simply never come back.

On the flip side, imagine you're an experienced developer looking for a promotion. Everyone recognizes your excellent work, but if folks don't enjoy working with you due to unhelpful feedback, it might ultimately limit your impact when promotion cycles roll around.

**It's important for both sides to do a good job in this area.** Building strong bonds leads to more positive interactions, greater impact, and personal career growth.

## How to give good reviews

### Comment on positive things

Most pull request reviews only focus on what needs to be changed. Sometimes simply providing positive feedback can go a long way to make the rest of your feedback more palatable. If somebody writes a great PR description with repro steps, how to test, and what problem it solves -- that's an easy opportunity for positive feedback.

Don't stamp disingenuous positive comments on every PR. But, if you genuinely see something you like, **comment on it and signal that you want that behavior to continue**.

### Comment on research you did

If you fire up a quick console app or [.NET Fiddle](https://dotnetfiddle.net/) to confirm something is working the way you think it does, leave a comment! It's positive feedback for the author, and it signals to other reviewers that you've verified the behavior. This also applies when confirming the author did something right -- if you looked up documentation and confirmed their approach is correct, say so. It's a great opportunity for positive feedback paired with the research you did.

### Ask questions using approachable language

Try to avoid phrases like "you should" or "you must" that sound instructive rather than collaborative. Instead:

- **"We should"** -- collective ownership
- **"Could we"** -- inviting discussion
- **"Let's"** -- working together
- **"What do you think?"** -- asking, not telling

**If you take one thing away from this post, try substituting "you" for "we" in your review comments.** Using "we" signals collective ownership. Using "you" can feel accusatory.

When suggesting an alternative approach, don't assume the author simply missed it. They may have already considered and rejected it for reasons you're not aware of. Frame suggestions with that possibility in mind -- "we could use X here, but you may have already considered that" invites dialogue rather than implying an oversight.

### Be kind and offer to help

Code needs to be technically accurate, but you can communicate technical feedback in a kind way. **One way to do this is to do the work for the person.** GitHub and Azure DevOps both have the triple backtick suggestion feature, enabling you to comment on a line and suggest an edit. Rather than simply commenting that something isn't right, you can provide a fix the author can accept with a click.

For larger changes, you can even [submit a pull request to a pull request branch]({% post_url 2016-02-16-can-we-make-some-changes-first-pull-requesting-a-github-pull-request %}).

### Have empathy

Put yourself in the other person's shoes. If someone is new to your team, imagine what it's like to just arrive and not know how things are done. Meet people where they're at -- if someone is brilliant in the front end but just switched to C#, they may not be as versed in the language yet, the same way you might not write fluent TypeScript. Personally, if I want to build empathy I think about reviewing code in a language I'm not familiar with -- for me that's Python. It helps me approach reviews with more patience and curiosity.

### Be pragmatic

**Look for ways to approve a pull request, not ways to shoot it down.** If there's a security issue or a major logic flaw, absolutely don't approve it. But, you can still be kind about it -- provide guidance on how to fix the problem, suggest resources the author can reference, and offer potential solutions while inviting their input. Something like "do you think X would work, or is there a different approach we could implement?" goes a long way. You're being firm about what needs to change while signaling that you're willing to work through it together.

For everything else, if the pull request looks great aside from a small spelling error in a readme, you can approve with suggestions. If someone's rushing to meet a deadline and the issues are minor formatting things, maybe we just don't worry about it this time. Code can be changed at any time for any reason.

### Prefix small things with "nit: "

If you see spelling, grammar, or formatting issues, they're still worth mentioning. But, prefixing with **"nit: "** signals it's a nitpick -- a small thing, not a big deal. It goes a long way to making feedback feel less like you're being beaten up over minor things. It's also a great opportunity to use the suggestion feature, so the author can simply click to accept your fix.

## Review strategies

### Think beyond the surface

When reviewing, zoom out. If code accepts user data, think about whether that data is validated properly. Are there security concerns? Content safety concerns? **These things won't point at themselves with a big arrow -- you need to think through them.**

### Look beyond the local context

GitHub shows you the changed lines with a bit of context above and below. But, there might be constants at the top of the file that should have been used, or patterns in other files that are relevant. **If you're not looking beyond the local context, you might miss opportunities as a reviewer.**

### Be pragmatic about refactoring

Neither "never copy-paste code" nor "copy-paste everything" is necessarily the best stance. Sometimes having duplicated code might be better than forming the wrong abstraction. If someone is rushing to meet a deadline, suggesting a refactor that doesn't need to happen right now can leave a bad taste. Be pragmatic about timing.

### Leverage automation

If formatting is important to your project, automate it so the build fails when expectations aren't met. **This frees humans to focus on things that are actually important and impactful** rather than a bunch of comments about formatting nits. That friction isn't fun for anyone involved. AI tools can also help catch things that might be missed during review.

## In closing

Reviews are about technical accuracy, but they're also about people. Be kind, be empathetic, be pragmatic, and look for opportunities to leave positive feedback. **You can be technically thorough and kind at the same time.**
