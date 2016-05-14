---
layout: post
title: Starting, Stopping, and Clearing the Azure Storage Emulator in C#
tags: csharp integration tests azure storage emulator
---

If you're writing code that uses Microsoft Azure Storage blobs, tables, or queues, you can use the storage emulator on Windows for local development -- rather than relying on the cloud while developing. And, using the [RimDev.Automation.StorageEmulator](https://www.nuget.org/packages/RimDev.Automation.StorageEmulator/) NuGet package, you can interact with it in C#!

**First**, install the [RimDev.Automation.StorageEmulator](https://www.nuget.org/packages/RimDev.Automation.StorageEmulator/) NuGet package.

```
PM> Install-Package RimDev.Automation.StorageEmulator
```

**Now**, it's as simple as:

```csharp
var automation = new AzureStorageEmulatorAutomation();

automation.Start();

AzureStorageEmulatorAutomation.IsEmulatorRunning(); // should be true

automation.ClearAll();

// Or, clear only certain things:
automation.ClearBlobs();
automation.ClearTables();
automation.ClearQueues();

automation.Stop();

AzureStorageEmulatorAutomation.IsEmulatorRunning(); // should be false
```

`AzureStorageEmulatorAutomation` implements `IDisposable`, too, but it only stops the emulator on dispose if that specific automation instance is what started it:

```csharp
using (var automation = new AzureStorageEmulatorAutomation())
{
    automation.Start();

    // Work with the running Azure Storage Emulator here.
}

// Outside the scope of the using, if the Azure Storage Emulator was
// started by `automation.Start();` above, then it should be shut down.
// If it was already running, it should remain running.
```

## Closing note

The GitHub repository associated with the [RimDev.Automation.StorageEmulator](https://www.nuget.org/packages/RimDev.Automation.StorageEmulator/) NuGet package is [https://github.com/ritterim/automation-storage-emulator](https://github.com/ritterim/automation-storage-emulator).
