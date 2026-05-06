---
layout: post
title: "Creating A User Readable Timestamp From Cosmos DB _ts Using SQL Query"
tags: ai-generated azure cosmosdb
---

Azure Cosmos DB documents include a `_ts` property that represents the last modified timestamp as a Unix epoch value in seconds. This isn't particularly human readable -- it's a number like `1714000000`.

You can convert `_ts` to a user readable date and time using the [`TIMESTAMPTODATETIME`](https://learn.microsoft.com/en-us/azure/cosmos-db/nosql/query/timestamptodatetime) built-in function in a Cosmos DB SQL query. Since `TIMESTAMPTODATETIME` expects milliseconds and `_ts` is in seconds, multiply `_ts` by `1000`:

```sql
SELECT VALUE {
    "doc": c,
    "friendly_ts": TIMESTAMPTODATETIME(c._ts * 1000)
}
FROM c
```

This returns each document alongside a `friendly_ts` value like `"2024-04-25T04:26:40.000Z"` -- much easier to read than a raw epoch number.

This is useful for quickly inspecting documents in the Azure portal's Data Explorer or any Cosmos DB query tool without needing to manually convert `_ts` values.
