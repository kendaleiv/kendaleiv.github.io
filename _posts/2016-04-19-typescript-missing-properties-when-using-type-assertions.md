---
layout: post
title: 'TypeScript: Missing Properties When Using Type Assertions'
tags: typescript
---

In C# and other languages, you may be familiar with the concept of a cast -- basically, explicitly coercing a *type* into another *type*. In C# this looks like `(MyClass)x`.

When using a C# cast, all of the properties and functionality of the destination type are available as expected. In C#, if there's a property like `public string SomeProperty { get { return _someProperty; } }`, this getter will function as expected. Basically, if the destination type is `T` the post-cast object is a fully functional instance of `T`.

However, the `<MyClass>obj` syntax of TypeScript is a **type assertion**, not a **cast**. It's a *hint* as to the type, which doesn't actually transform the underyling JavaScript object. **If the underlying JavaScript object does not have a set of properties, using type assertion will not apply them in the same manner as a cast would.**

Consider the following TypeScript example:

```
class Person {
  constructor(public givenName: string, public familyName: string) {
  }

  get name() {
    return `${this.givenName} ${this.familyName}`;
  }
}

const person = new Person("John", "Doe");
const personFromJson = <Person>JSON.parse(
  '{ "givenName": "John", "familyName": "Doe" }');

console.log(person.name); // John Doe
console.log(personFromJson.name); // undefined
```

It's important to recognize the difference between type assertions and casts when working with TypeScript.
