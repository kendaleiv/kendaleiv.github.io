---
layout: post
title: A Complete Protractor Travis CI Solution for Angular E2E Testing
tags: angular
---

**TL;DR:** Example at [https://github.com/kendaleiv/angular-testing](https://github.com/kendaleiv/angular-testing).

---

[Angular](https://angular.io) uses [Protractor](https://www.protractortest.org) for end-to-end (e2e) testing. Protractor performs browser automation tasks using a running copy of your Angular application.

## Configure the project

With continuous integration Angular builds, you generally want to run the linter, tests, and e2e tests (if you have these items).

**Note:** If `npm test` is setup as a continuous test runner, you'll want to create a `test:once` script or similar. If you're using the Angular CLI, you could use something like `"test:once": "ng test --watch=false"`.

Next, assuming `npm run lint` and `npm run test:once` are setup, add `"ci": "npm run lint && npm run test:once && npm run e2e"` to your **package.json** `scripts`. You probably want to run it with `npm run ci` at this point to make sure it works.

## Add Travis CI configuration

Add the following **.travis.yml** file to your repository root *(this expects Google Chrome to be used for e2e tests)*.

```yaml
sudo: required
dist: trusty
addons:
  apt:
    sources:
      - google-chrome
    packages:
      - google-chrome-stable
language: node_js
node_js:
  - 6
  - 7
before_script:
  - export DISPLAY=:99.0
  - sh -e /etc/init.d/xvfb start
install:
  - npm install
script:
  - npm run ci
```

Now, try it out!

## Example

For an example check out [https://github.com/kendaleiv/angular-testing](https://github.com/kendaleiv/angular-testing), which includes regular unit testing as well.
