---
layout: post
title: 100% Code Coverage Doesn't Mean It Works
tags: tests coverage
---

Tests are great. I like testing, tests, and talking about testing and tests.

I think code coverage is useful. It can identify gaps in testing, providing a "hey, maybe you should test *over here*" notion. But, 100% coverage doesn't mean everything works perfectly. **100% test coverage doesn't mean anything works properly.** It means all the code was executed in some fashion. All statements were visited. Basically, the only thing it shows is the code didn't unexpectedly throw an unhandled error.

## No assertions, 100% coverage

Here's an example of 100% code coverage with no asserts:

```javascript
function isNumberSeven(number) {
  return number === 7;
}
```

```javascript
// Jasmine
describe('isNumberSeven tests', () => {
  it('runs', () => {
    isNumberSeven();
  });
});
```

[Todd Gardner](https://twitter.com/toddhgardner) refers to this as "Assertion-Free Testing" in his [Software Testing for Failed Projects](https://vimeo.com/171319741) talk at NDC Oslo 2016.

## Assertions! And, more tests!

Using assertions (and, more tests) dramatically improves the quality of the test suite.

```javascript
// Jasmine
describe('isNumberSeven tests', () => {
  it('returns true for 7', () => {
    expect(isNumberSeven(7)).toBe(true);
  });

  it('returns false for 6', () => {
    expect(isNumberSeven(6)).toBe(false);
  });

  it('returns false for 8', () => {
    expect(isNumberSeven(8)).toBe(false);
  });
});
```

## Use code coverage, not because you "have to"

Code coverage can be a useful tool to show trends and identify potential gaps in testing. But, using it as a blind metric could be harmful. If you're mandated to abide by a certain percentage of coverage, you can *technically* achieve the goal without getting the value you'd expect out of good, well-authored tests.
