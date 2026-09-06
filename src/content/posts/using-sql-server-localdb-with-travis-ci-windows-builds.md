---
title: "Using SQL Server LocalDB with Travis CI Windows Builds"
slug: using-sql-server-localdb-with-travis-ci-windows-builds
pubDatetime: 2019-01-05T00:00:00-05:00
description: "Install SQL Server LocalDB with Chocolatey for Travis CI Windows builds."
tags: ["travis-ci", "continuous-integration"]
---

[Travis CI](https://travis-ci.org/) now includes support for Windows builds. It doesn't have SQL Server LocalDB installed by default currently, but it's easy to install. Here's an example Travis CI configuration that installs it using [Chocolatey](https://chocolatey.org/):

## .travis.yml

```yaml
language: shell

os: windows

before_script:
# Use mssqlserver2014-sqllocaldb rather than sqllocaldb package which has an issue:
# https://dba.stackexchange.com/questions/191393/localdb-v14-creates-wrong-path-for-mdf-files
- choco install mssqlserver2014-sqllocaldb
- powershell -Command "Set-ExecutionPolicy Bypass"

script:
- powershell -File build.ps1
```

Let me know if this was helpful!
