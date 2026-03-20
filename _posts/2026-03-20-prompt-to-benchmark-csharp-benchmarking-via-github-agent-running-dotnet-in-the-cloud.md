---
layout: post
title: "Prompt To Benchmark: C# Benchmarking Via GitHub Agent Running .NET In The Cloud"
tags: csharp dotnet github
---

When creating a new repository on GitHub you can provide instructions for a [GitHub Copilot coding agent](https://docs.github.com/en/copilot/using-github-copilot/using-copilot-coding-agent) to execute. The agent picks up those instructions, does the work in the cloud, and opens a pull request with the results -- all from a single prompt at repository creation time.

You can use this to create a C# [BenchmarkDotNet](https://benchmarkdotnet.org/) project. The prompt can include the specific benchmarks to run and everything needed to get benchmark results in a pull request. The agent creates the project, builds in release mode, runs the benchmarks in the cloud, and opens a pull request.

This is a useful technique for benchmarking -- you describe the scenarios and configuration upfront, and the agent handles project creation, dependency installation, building in release mode, and running the benchmarks. Writing a detailed prompt means you get benchmark results and a reviewable project without any manual setup.

## Prompt

Here's a prompt to use as a starting point:

````
Create a C# BenchmarkDotNet project comparing <your scenarios here>.

## Setup

- <provide any specific instructions needed for setup>

## Benchmark building instructions

- Create the C# benchmarking code.
- Include allocations in the benchmarking.
- Ensure the benchmarking is built for reliable results.
  - Release build
  - Anything else necessary for reliable results
- Run benchmarking in the cloud agent.

## README.md specific instructions

- Include benchmarking results as markdown in README.md.
- Include any caveats to benchmarking in the cloud agent in README.md.
- Include this entire exact prompt in README.md as a code block, make it somewhere below the benchmarking results and any caveats. Use quadruple backticks on the outermost code block since this prompt contains triple backtick code blocks.
- Update the README.md title to be "<your title here>".
- Include basic repository license information at the end of README.md.

## Benchmark: <Name>

```csharp
// Setup
<your setup code>

// Benchmark
<your benchmark code>
```

## Benchmark: <Name>

```csharp
// Setup
<your setup code>

// Benchmark
<your benchmark code>
```

(repeat for each scenario you want to benchmark)
````

## Example Repository

[https://github.com/kendaleiv/mapperly-vs-serialization-deserialization-vs-manual-mapping-benchmarking](https://github.com/kendaleiv/mapperly-vs-serialization-deserialization-vs-manual-mapping-benchmarking)
