---
layout: post
title: 'Sending Silverpop Transact XML Messages with C#'
tags: silverpop transact email csharp
---

[Silverpop](https://www.silverpop.com/) is an marketing service that includes email marketing -- both for sending *normal* email campaign messages, as well as sending transactional emails. This transactional emailing is referred to as [Silverpop Transact](https://www.silverpop.com/Software/Engage-Apps/Apps/Transact/), which has an XML API available. These transactional messages could be sent as the result of a web application action, such as a new user registration.

You can communicate directly with the XML API yourself. Alternatively, you can use the open source [Silverpop .NET API](https://github.com/ritterim/silverpop-dotnet-api) wrapper, which is demonstrated below.

It's available on NuGet! Simply `Install-Package silverpop-dotnet-api`.

## Show me the code!

```csharp
// Initialize the client.
// This method requires configuration to be set.
var client = TransactClient.CreateUsingConfiguration();

// Create a simple message.
var message = TransactMessage.Create(
    123, // TODO: Change this to be your campaign id!
    TransactMessageRecipient.Create("user@example.com");

// Send the message using the client.
// This uses async/await.
// Synchronous operations are available too.
var response = await client.SendMessageAsync(message);
```

Messages can also include personalization tags, for adding dynamic content to email messages.

**Note:** **SendMessage/SendMessageAsync** are methods for sending messages to 1-10 recipients. For larger numbers of recipients use **SendMessageBatch/SendMessageBatchAsync**.

## In closing

Using the [Silverpop .NET API](https://github.com/ritterim/silverpop-dotnet-api) should get you moving quickly, without having to understand the details of working with the [Silverpop Transact](https://www.silverpop.com/Software/Engage-Apps/Apps/Transact/) XML API. It's open source software, too!

**Note:** The [Silverpop .NET API](https://github.com/ritterim/silverpop-dotnet-api) is not sponsored by or affiliated with [Silverpop](https://www.silverpop.com/).

**Disclosure:** I'm a contributor for the [Silverpop .NET API](https://github.com/ritterim/silverpop-dotnet-api), developed for and to support [Ritter Insurance Marketing](https://www.ritterim.com/).
