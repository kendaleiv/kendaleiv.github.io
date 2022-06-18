---
layout: post
title: Refactor and Test jQuery/JS Code
tags: jquery javascript refactoring testing
---

jQuery is a JavaScript library many web developers utilize for writing concise and powerful browser code, as well as abstracting away browser differences and deficiencies. While jQuery may become less relevant over time as more modern and greenfield browsers are widely adopted, it is a real and present part of modern web development today.

**What jQuery does not provide, however, is any form of built-in programmatic structure.** And, when applications are built with no thought as to organization, they can quickly become unmaintainable spaghetti code. Modifying the DOM, making ajax requests, and other program logic can be quick and easy to write using jQuery -- doing what is necessary to Get The Job Done &trade;. **However, when code is written with mixing of concerns, it can cause significant pain later in the form of a difficult to maintain codebase.**

**Fortunately, many spaghetti code issues can be mitigated by following the [single responsibility principle](http://en.wikipedia.org/wiki/Single_responsibility_principle)**. Each function, module, component, etc. should ideally be fulfilling a single and specific concern. I'm not asserting follow this principle in the strictest sense, however, **having this principle in mind may improve your code significantly**.

**With mixed concerns:**

```javascript
$.ajax(url).done(function (res) {
    var quote = $(res).find('[symbol="' + stockSymbol + '"]');
    var lastTradePrice = quote.find('LastTradePriceOnly').text();

    // More code not related to getting the lastTradePrice
});
```

**After refactor:**

```javascript
(function (global, $) {
    'use strict';
    global.stockRetriever = global.stockRetriever || {};

    global.stockRetriever.dataProvider = {
        getPrices: function (symbols) {
            return $.Deferred(function (dfd) {
                // Omitted for brevity:
                // Perform jQuery.ajax() or similar request and
                // resolve or reject the dfd.
            }).promise();
        }
    };
})(this, jQuery);

stockRetriever.dataProvider.getPrices('MSFT')
    .done(function (res) { /* Code here */ });
```

**In the refactored code above the ajax request is encapsulated behind `stockRetriever.dataProvider.getPrices(symbols)`** by creating a deferred using `jQuery.Deferred()` then resolving or rejecting it. We return a `promise()` from the deferred to mimic the same behavior as `jQuery.ajax()` and similar methods. *Returning a `promise()` isn't absolutely required, but it is good practice as it protects the deferred from other code resolving or rejecting it.* [Here's the code](https://github.com/kendaleiv/jquery-js-refactor/blob/92bf500b705579659087ab6b012c8c1e3be39796/main.js#L6) if you're feeling adventurous.

**Now is a great time to author some tests as follows:**  
<small>*(Note: [`toBeADecimalNumber()`](https://github.com/kendaleiv/jquery-js-refactor/blob/92bf500b705579659087ab6b012c8c1e3be39796/specs.js#L10) is a [Jasmine custom matcher](http://jasmine.github.io/2.0/custom_matcher.html))*</small>

```javascript
describe('dataProvider', function () {
    var dataProvider = stockRetriever.dataProvider;

    it('should return single price', function (specDone) {
        dataProvider
            .getPrices('MSFT')
            .done(function (res) {
                var item = res[0];
                expect(item.symbol).toBe('MSFT');
                expect(item.lastTradePrice).toBeADecimalNumber();
                specDone();
            });
    });

    it('should return multiple prices', function (specDone) {
        dataProvider
            .getPrices(['MSFT', 'GOOG'])
            .done(function (res) {
                var msft = res[0];
                expect(msft.symbol).toBe('MSFT');
                expect(msft.lastTradePrice).toBeADecimalNumber();

                var goog = res[1];
                expect(goog.symbol).toBe('GOOG');
                expect(goog.lastTradePrice).toBeADecimalNumber();

                specDone();
            });
    });
    
    // "should throw error for ..." tests omitted
});
```

We can also **test the code that calls `dataProvider.getPrices`**, which you can [view on GitHub](https://github.com/kendaleiv/jquery-js-refactor/blob/92bf500b705579659087ab6b012c8c1e3be39796/specs.js#L170).

If you want to explore this further take a look at the [kendaleiv/jquery-js-refactor](https://github.com/kendaleiv/jquery-js-refactor) GitHub repository. The initial commit is in a yet-to-be-refactored state, and each commit is *(hopefully!)* making it better.