---
layout: post
title: Using BenchmarkDotNet with Azure Functions
tags: dotnetcore
---

[BenchmarkDotNet](https://benchmarkdotnet.org/) is a tool for benchmarking .NET applications. [Azure Functions](https://azure.microsoft.com/en-us/services/functions/) is a serverless web application offering. You can put these together to benchmark your Azure Functions applications.

## Setup

Ultimately, it looks like this:

```csharp
using BenchmarkDotNet.Attributes;
using System;
using System.Diagnostics;
using System.Net.Http;
using System.Threading.Tasks;

namespace FunctionAppBenchmark
{
    [InProcess]
    public class Benchmarks
    {
        private const int FunctionsPort = 7071;

        private Process funcProcess;
        private HttpClient httpClient;

        [GlobalSetup]
        public void GlobalSetup()
        {
            funcProcess = new Process
            {
                StartInfo =
                {
                    FileName = "func.exe",
                    Arguments = $"start -p {FunctionsPort}",
                    WorkingDirectory = "src/FunctionApp"
                }
            };

            var started = funcProcess.Start();

            if (!started)
            {
                throw new Exception("func.exe was not started.");
            }

            httpClient = new HttpClient
            {
                BaseAddress = new Uri($"http://localhost:{FunctionsPort}")
            };
        }

        [GlobalCleanup]
        public void GlobalCleanup()
        {
            if (!funcProcess.HasExited)
            {
                funcProcess.Kill();
            }
        }

        [Benchmark]
        public async Task FastEndpoint()
        {
            var response = await httpClient.GetAsync("/api/run");

            response.EnsureSuccessStatusCode();
        }

        [Benchmark]
        public async Task SlowEndpoint()
        {
            var response = await httpClient.GetAsync("/api/run-slow");

            response.EnsureSuccessStatusCode();
        }
    }
}
```

## Run the benchmark

Build and run the **Release** build:

```
dotnet build -c Release
dotnet .\tests\FunctionAppBenchmark\bin\Release\netcoreapp3.1\FunctionAppBenchmark.dll
```

which produces the following:

```
BenchmarkDotNet=v0.12.1, OS=Windows 10.0.19042
Intel Core i7-1065G7 CPU 1.30GHz, 1 CPU, 8 logical and 4 physical cores
.NET Core SDK=3.1.403
  [Host] : .NET Core 3.1.9 (CoreCLR 4.700.20.47201, CoreFX 4.700.20.47203), X64 RyuJIT

Job=InProcess  Toolchain=InProcessEmitToolchain
```

|       Method |         Mean |      Error |     StdDev |
|------------- |-------------:|-----------:|-----------:|
| FastEndpoint |     2.988 ms |  0.1073 ms |  0.3044 ms |
| SlowEndpoint | 2,030.517 ms | 10.8453 ms | 10.1447 ms |

---

**A complete sample is available at [https://github.com/kendaleiv/AzureFunctionsCSharpBenchmarkDotNet](https://github.com/kendaleiv/AzureFunctionsCSharpBenchmarkDotNet).** Happy benchmarking!
