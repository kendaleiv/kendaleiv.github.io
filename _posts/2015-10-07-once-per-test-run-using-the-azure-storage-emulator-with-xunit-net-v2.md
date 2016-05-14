---
layout: post
title: 'Once Per Test Run: Using the Azure Storage Emulator with xUnit.net v2'
tags: csharp xunit azure storage emulator
---

If you're using the Azure Storage Emulator as part of a suite of integration tests using xUnit.net v2, **ideally you start and stop the emulator only once per test run**. With xUnit.net v2, you can accomplish this using `ICollectionFixture<TFixture>` and decorating your test classes with `CollectionAttribute`.

By using the `CollectionAttribute`, you're instructing xUnit.net 2.x to run these tests in serial *(which, is good, since parallel tests in this manner could be problematic)*.

Check this out:

```csharp
[CollectionDefinition("AzureStorageIntegrationTests")]
public class AzureStorageEmulatorCollection : ICollectionFixture<AzureStorageEmulatorFixture>
{
}
```

```csharp
public class AzureStorageEmulatorFixture : IDisposable
{
    private readonly AzureStorageEmulatorAutomation _automation;

    public AzureStorageEmulatorFixture()
    {
        _automation = new AzureStorageEmulatorAutomation();

        Console.WriteLine("----- Invoking Automation Start -----");
        _automation.Start();
    }

    public void Dispose()
    {
        Console.WriteLine("----- Invoking Automation Dispose -----");
        _automation.Dispose();
    }
}
```

```csharp
[Collection("AzureStorageIntegrationTests")]
public class IntegrationTestClass1
{
    [Fact]
    public void VerifyEmulatorIsRunning()
    {
        Assert.True(AzureStorageEmulatorAutomation.IsEmulatorRunning());
    }
}
```

```csharp
[Collection("AzureStorageIntegrationTests")]
public class IntegrationTestClass2
{
    [Fact]
    public void VerifyEmulatorIsRunning()
    {
        Assert.True(AzureStorageEmulatorAutomation.IsEmulatorRunning());
    }
}
```

A full example of this is available at [https://github.com/kendaleiv/azure-storage-integration-tests](https://github.com/kendaleiv/azure-storage-integration-tests).
