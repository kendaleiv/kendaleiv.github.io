---
layout: post
title: Dynamic Parameterized SQL Using ADO.NET With C#
tags: dotnet
---

Here's a C# solution for dynamic parameters inside a SQL string:

```csharp
var items = new[] { "a", "b", "c" };
var connection = new SqliteConnection($"Data Source={Filename}");
await connection.OpenAsync();

var parameters = items.Select((x, i) => Tuple.Create($"@{i}", x));

var command = connection.CreateCommand();
command.CommandText =
    $"select count(*) from TestTable where name in ({string.Join(",", parameters.Select(x => x.Item1))})";

foreach (var parameter in parameters)
{
    command.Parameters.AddWithValue(parameter.Item1, parameter.Item2);
}

var count = (long)await command.ExecuteScalarAsync();
```

**Note:** While it may be easier to inject the values directly into the string rather than constructing parameters, it's a good idea to parameterize to prevent potential SQL injection attacks.

## Full sample

See [https://github.com/kendaleiv/CSharpDynamicSqlParameters](https://github.com/kendaleiv/CSharpDynamicSqlParameters) for a full sample.
