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
    "datetime_ts": TIMESTAMPTODATETIME(c._ts * 1000)
}
FROM c
```

Example output:

```json
[
    {
        "doc": {
            "id": "1",
            "name": "Example Document",
            "_ts": 1778025600
        },
        "datetime_ts": "2026-05-06T00:00:00.000Z"
    }
]
```

While the epoch number in `_ts` is useful for machines, the `datetime_ts` value provides a human readable representation.

This is useful for quickly inspecting documents in the Azure portal's Data Explorer or any Cosmos DB query tool without needing to manually convert `_ts` values.
