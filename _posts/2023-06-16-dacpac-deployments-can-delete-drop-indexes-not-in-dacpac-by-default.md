---
layout: post
title: DACPAC Deployments Can Delete/Drop Indexes Not In DACPAC By Default
tags: dacpac
---

A DACPAC is a method for deploying a database via code. You specify the desired state of the database and the tooling determines how to modify the target database to match the desired state. *(see [https://learn.microsoft.com/en-us/sql/relational-databases/data-tier-applications/data-tier-applications](https://learn.microsoft.com/en-us/sql/relational-databases/data-tier-applications/data-tier-applications) for more details)*

**Deploying a DACPAC can result in indexes being deleted/dropped on the target database that do not exist in the DACPAC by default.**

If you want to keep indexes that were created on the target database and don't exist in the DACPAC **the behavior is configuable via `DropIndexesNotInSource`**.

If you're deploying via `SqlPackage /Action:Publish` specify `/p:DropIndexesNotInSource=False` *(see [https://learn.microsoft.com/en-us/sql/tools/sqlpackage/sqlpackage-publish](https://learn.microsoft.com/en-us/sql/tools/sqlpackage/sqlpackage-publish))*.

## Tests

```csharp
[Fact]
public async Task DacServicesDeletesExistingIndexByDefault()
{
    // Arrange
    using var database = ThrowawayDatabase.FromLocalInstance(@"(LocalDB)\MSSQLLocalDB");

    var dacPackage = DacPackage.Load("../../../../../src/TestDatabase/bin/Debug/TestDatabase.dacpac");
    var dacServices = new DacServices(database.ConnectionString);

    dacServices.Deploy(dacPackage, database.Name, upgradeExisting: true);

    using (var connection = await database.OpenConnectionAsync())
    {
        var createIndexCommand = new SqlCommand("CREATE NONCLUSTERED INDEX TestIndex1 ON [dbo].[TestTable] (Id)", connection);
        await createIndexCommand.ExecuteNonQueryAsync();
    }

    // Act
    dacServices.Deploy(dacPackage, database.Name, upgradeExisting: true);

    // Assert
    using (var connection = await database.OpenConnectionAsync())
    {
        var checkIndexCommand = new SqlCommand("SELECT 1 FROM sys.indexes WHERE name = 'TestIndex1'", connection);
        var result = await checkIndexCommand.ExecuteScalarAsync();

        Assert.Null(result);
    }
}
```

```csharp
[Fact]
public async Task DacServicesDoesNotDeleteExistingIndexWhenDropIndexesNotInSourceIsFalse()
{
    // Arrange
    using var database = ThrowawayDatabase.FromLocalInstance(@"(LocalDB)\MSSQLLocalDB");

    var dacPackage = DacPackage.Load("../../../../../src/TestDatabase/bin/Debug/TestDatabase.dacpac");
    var dacServices = new DacServices(database.ConnectionString);

    dacServices.Deploy(dacPackage, database.Name, upgradeExisting: true);

    using (var connection = await database.OpenConnectionAsync())
    {
        var createIndexCommand = new SqlCommand("CREATE NONCLUSTERED INDEX TestIndex2 ON [dbo].[TestTable] (Id)", connection);
        await createIndexCommand.ExecuteNonQueryAsync();
    }

    // Act
    dacServices.Deploy(dacPackage, database.Name, upgradeExisting: true, new DacDeployOptions
    {
        DropIndexesNotInSource = false
    });

    // Assert
    using (var connection = await database.OpenConnectionAsync())
    {
        var checkIndexCommand = new SqlCommand("SELECT 1 FROM sys.indexes WHERE name = 'TestIndex2'", connection);
        var result = await checkIndexCommand.ExecuteScalarAsync();

        Assert.NotNull(result);
    }
}
```

## Demo

These tests are available at [https://github.com/kendaleiv/dacpac-playground/blob/main/tests/TestDatabase.Tests/IndexTests.cs](https://github.com/kendaleiv/dacpac-playground/blob/main/tests/TestDatabase.Tests/IndexTests.cs).
