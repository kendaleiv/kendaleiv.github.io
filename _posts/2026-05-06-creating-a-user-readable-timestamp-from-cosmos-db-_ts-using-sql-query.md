---
layout: post
title: "Creating A User Readable Timestamp From Cosmos DB _ts Using SQL Query"
tags: ai-generated azure cosmosdb
---

Azure Cosmos DB documents include a `_ts` property representing the last modified time as a [Unix timestamp](https://en.wikipedia.org/wiki/Unix_time) in seconds. While useful for machines, a value like `1714000000` isn't particularly human readable.

You can convert `_ts` to a human readable date and time using the [`TIMESTAMPTODATETIME`](https://learn.microsoft.com/en-us/azure/cosmos-db/nosql/query/timestamptodatetime) built-in function in a Cosmos DB SQL query. Since `_ts` is in seconds and `TIMESTAMPTODATETIME` expects milliseconds, multiply by `1000`:

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

While `_ts` stores a Unix timestamp suited for machines, the `datetime_ts` value provides a human readable representation.

This is useful for quickly inspecting documents in the Azure portal's Data Explorer or any Cosmos DB query tool without needing to manually convert `_ts` values.
