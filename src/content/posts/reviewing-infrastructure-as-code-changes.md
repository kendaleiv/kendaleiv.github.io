---
title: "Reviewing Infrastructure as Code Changes"
pubDatetime: 2026-11-05T00:00:00-05:00
featured: true
description: "When creating new resources or modifying existing ones validating changes can keep efforts moving and confidence high."
tags: ["code-review", "iac"]
---

AI can accelerate the authoring of code, and this extends to infrastructure as code (IaC) too. Whether you're using Azure specific ARM or Bicep, or a platform agnostic tool like Terraform, **validation is important to keep velocity, confidence, and reliability high**.

## Pull request validation

When validating infrastructure as code there's two ways to examine it, validating the syntax and validating the outcome.

**Validating the syntax ensures a merged pull request won't immediately fail** and consequently break the build. As part of pull request validation, run the appropriate tooling to ensure syntax is correct and will be accepted by the deployment tool.

In addition to validating the syntax, you can also **validate the outcome**. In this case, you'd **run the actual deployment on testing resources**. Whether you construct new resources completely from scratch or use an existing pre-production environment, running the actual deployment can help catch issues beyond syntax. Maybe an error will be returned by the deployment. Or, if it's a web API maybe it will be inaccessible to incoming traffic.

Since actual resources are deployed you can validate how it's working. If you have a smoke test script perhaps you could run it. Or, if you don't and it's possible and appropriate to do so, you or AI can exercise the deployed resources too.

## Modifying existing resources

Not only can AI rapidly construct new resources, it can help modify existing ones too. However, it's important to keep in mind the production implications of the changes. Will it result in a temporary or broken until fixed outage?

**Testing in a pre-production environment can go a long way here to ensure reliability.** If you're constructing new resources solely for testing you may want to spin up the environment without the changes, then apply the changes, similar to how it would be done in production.

You can also monitor the rollout of the changes. In the case of a web app, I have a blog post that can help monitor the rollout if you're looking to assess the impact: [Monitoring Web Application Deployment Impact Using Artillery](/monitoring-web-application-deployment-impact-using-artillery/).

## Closing

AI can rapidly construct new and modify existing infrastructure as code. The task is to understand what's happening in order to exercise human judgement in terms of what might go wrong. Checking syntax and following it up with deploying and validating actual pre-production resources can go a long way in safely working with infrastructure as code.
