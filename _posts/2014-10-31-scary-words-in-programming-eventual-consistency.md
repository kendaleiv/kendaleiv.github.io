---
layout: post
title: 'Scary Words in Programming: Eventual Consistency'
tags: eventual consistency
---

[Pam Selle](https://twitter.com/pamasaur) has been writing blog posts on [Scary Words in Programming](https://thewebivore.com/tag/scary-words/). This is my contribution on **eventual consistency**.

>Eventual consistency is a consistency model used in distributed computing to achieve high availability that informally guarantees that, if no new updates are made to a given data item, eventually all accesses to that item will return the last updated value.
>
> -- <cite>Wikipedia: [Eventual consistency](https://en.wikipedia.org/wiki/Eventual_consistency)</cite>

Essentially, in a database or system utilizing eventual consistency, changes made to data may have an impactful delay associated with changes being reflected. In a NoSQL document database, like [RavenDB](https://ravendb.net/), the time between writing and reading the updated data from an index could be trivial or significant, depending upon the use case.

Eventual consistency itself isn't terribly complex or difficult to understand. But, it *can* be scary when implemented in ways that do not meet with user expectations. **Users looking at data and seeing their changes not reflected can cause alarm.** Developers should consider what users will see and do immediately after editing data in an application or website utilizing eventual consistency to avoid confusion and panic.

If you choose to utilize eventual consistency, you'll want to understand the implications of this decision and ideally shield your users from the concept, where possible.
