---
layout: post
title: Exporting All Tickets from Zendesk
tags: zendesk
---

[Zendesk](https://www.zendesk.com/) is a web based customer service application that includes tickets.

As a Zendesk customer, you can typically interact only with tickets that are not archived. **Archiving takes place [120 days after the ticket has been closed](https://support.zendesk.com/hc/en-us/articles/203657756-Ticket-Archiving), which is problematic for viewing *all* of your tickets and for creating reports requiring long running historical data.**

## The Solution

**The [ZenDesk Ticket Incremental Exporter](https://github.com/ritterim/zendesk-ticket-exporter) can help! It orchestrates retrieval of all of your Zendesk tickets, enabling you to incrementally download only changes since your last retrieval.**

The first run may take considerable time depending upon the total number of tickets to retrieve. Subsequent runs, however, will only retrieve tickets created or modified since the previous run.

The tool can generate a CSV file, which can be used with a spreadsheet application *(or, anything that can use a CSV)* to inspect the tickets or perform any desired analysis.

## Why the special tool?

Downloading all tickets using the Zendesk API is non-trivial, as you need to make a separate request for each batch of tickets. Also, the [Incremental Tickets API](https://developer.zendesk.com/rest_api/docs/core/ticket_export) used for this is rate limited to one request per minute and only permits 1,000 tickets per request *(at the time of this writing)*.

## How do I get started?

**Browse over to the [ritterim/zendesk-ticket-exporter](https://github.com/ritterim/zendesk-ticket-exporter) GitHub repository for installation and usage information.**

## Acknowledgement

Special thanks to [Ritter Insurance Marketing](http://www.ritterim.com/) for supporting open source software and giving me the opportunity to begin construction of this tool!
