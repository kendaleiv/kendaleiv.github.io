---
layout: post
title: Using JavaScript Promises And async/await Together
tags: javascript
---

`async` / `await`  in JavaScript are syntactic sugar for `Promise`s. Since it's syntactic sugar, they can be used interchangeably!

Here's an example:

```javascript
class TestClass {
  getPromiseValue() {
    return Promise.resolve('test-promise-value');
  }

  async getAsyncValue() {
    return 'test-async-value';
  }
}

//
// Promise -> Promise
//

new TestClass().getPromiseValue().then(x => {
  console.log(`then: ${x}`);
});

//
// Promise -> `async`
//

new TestClass().getAsyncValue().then(x => {
  console.log(`then: ${x}`);
});

//
// `await` -> Promise
//

async function awaitAPromise() {
  const testClass = new TestClass();
  console.log('await: ' + await testClass.getPromiseValue());
}
awaitAPromise();

//
// `await` -> `async`
//

async function awaitAnAsync() {
  const testClass = new TestClass();
  console.log('await: ' + await testClass.getAsyncValue());
}
awaitAnAsync();
```

## Console output

```
then: test-promise-value
then: test-async-value
await: test-promise-value
await: test-async-value
```

## Note

`await` is only valid inside an `async` function!
