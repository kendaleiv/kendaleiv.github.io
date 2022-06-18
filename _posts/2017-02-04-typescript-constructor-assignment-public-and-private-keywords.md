---
layout: post
title: 'TypeScript Constructor Assignment: public and private Keywords'
tags: typescript
---

TypeScript includes a concise way to create and assign a class instance property from a constructor parameter.

Rather than:

```typescript
class TestClass {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }
}
```

One can use the `private` keyword instead:

```typescript
class TestClass {
  constructor(private name: string) { }
}
```

The `public` keyword works in the same fashion, but also instructs the TypeScript compiler that it's OK to access the property from outside the class.

Here's a more complete example including the `public` keyword, as well as the result of not including a keyword:

```typescript
class TestClass {
  constructor(name: string, private address: string, public city) { }

  testMethod() {
    console.log(this.name) // Compiler error: Property 'name' does not exist on type 'TestClass'.
    console.log(this.address);
    console.log(this.city);
  }
}

const testClass = new TestClass('Jane Doe', '123 Main St.', 'Cityville');

testClass.testMethod();

console.log(testClass.name);    // Compiler error: Property 'name' does not exist on type 'TestClass'.
console.log(testClass.address); // Compiler error: 'address' is private and only accessible within class 'TestClass'.
console.log(testClass.city);
```

Love this shortcut? Not a fan? Let me know in the comments!
