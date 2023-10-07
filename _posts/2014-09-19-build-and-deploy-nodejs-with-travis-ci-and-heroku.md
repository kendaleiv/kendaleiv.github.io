---
layout: post
title: Build and Deploy Node.js With Travis CI and Heroku
tags: nodejs travis-ci heroku continuous-integration deployment
---

[Travis CI](https://travis-ci.org/) is a cloud hosted continuous integration service that works with GitHub repositories for [supported languages](https://docs.travis-ci.com/user/getting-started/#Travis-CI-Overview). [Heroku](https://www.heroku.com/) is a cloud hosted platform as a service, enabling you to deploy applications without creating or maintaining server infrastructure for [supported languages](https://devcenter.heroku.com/categories/language-support).

If you have an application you wish to use for this exercise already in a GitHub repository, skip ahead to the Travis CI section. You may need to do some adjustments to your code to meet with Heroku expectations (specifically, using the requested port number from `process.env.PORT`).

If you don't have an existing Node.js application, and instead want to deploy a sample one, [there's one on the Heroku documentation you can use](https://devcenter.heroku.com/articles/getting-started-with-nodejs-o#write-your-app). On that page you'll also find that you need to use `npm init` to create a valid `package.json` file, as well as information about *engines* if you want to control what version of Node.js is deployed *(by default, it will deploy the latest stable version)*.

## Travis CI

Browse to [https://travis-ci.org/](https://travis-ci.org/) and flip the appropriate toggle switch, instructing Travis CI which GitHub repository to build. You'll need to authorize Travis CI to interact with your GitHub account if you haven't done so already.

Travis CI uses a `.travis.yml` configuration file in the root of your repository. You'll want to create this file before moving on. Here's an [example `.travis.yml` you can use](https://docs.travis-ci.com/user/languages/javascript-with-nodejs/), which will initiate a separate build for each of the specified versions of Node.js.

Anytime you modify the `.travis.yml` file, you may wish to run it through a linter to verify its validity before you commit it.

Now is a good time to ensure Travis CI builds. Push your code to the GitHub repo to get this process started. Then, navigate to Travis CI in a web browser and ensure everything looks good. Also, if you have automated tests, you may want to get these working now -- but I'll leave that to you.

## Deploy to Heroku from Travis CI

You'll want to install the necessary prerequisites for this section. This includes the [Heroku Toolbelt](https://toolbelt.heroku.com/) and the [Travis CI Client](https://github.com/travis-ci/travis.rb#readme).

Run `heroku login` to setup the Heroku Toolbelt. If you've done this before, you may be able to skip this step.

Next, create a new Heroku application with `heroku create yourappname`. For subsequent `heroku` commands interacting with this application -- if you are outside your repository directory *(or, you don't have the Heroku Toolbelt configured for your local repository)*, you will need to append `--app yourappname` to your `heroku` commands to instruct the Heroku Toolbelt which application you wish to target.

Run `travis setup heroku`. During this process you'll need to provide your Heroku API key. Use the secure API key option. **At no point should you commit or otherwise reveal your non-encrypted Heroku API key.**

Create the Heroku `Procfile` pointing to the main application entry point. Assuming `web.js` is your application entry point, use:

```
web: node web.js
```

Everything should now be setup in your local repository. Commit and push your changes to GitHub, then wait for Travis CI to complete its operations.

By default, Heroku doesn't assign you a dyno to run your application on. To start one, run `heroku ps:scale web=1`. At the time of this post a single dyno can be ran for free.

Now, browse to your application at the expected Heroku hosted address to see if it works. If everything appears working, good job and well done! If it doesn't, don't panic. Run `heroku logs` to try to find your issue.

If no Node.js version information was explicitly specified, Heroku should deploy using the latest stable version of Node.js.

## Show off your build

As a reward for a working cloud CI build, add the Travis CI build status badge to your GitHub `README.md` to show off the (hopefully passing) status of your Travis CI build. Simply add `![Travis CI Build Status](the_image_url_here)` to the `README.md` to display the image. If you don't have a `README.md` or equivalent file, now is a great time to create one!
