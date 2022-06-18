---
layout: post
title: "TypeScript: Where's My C# Style Object Initializers?"
tags: typescript
---

In C#, you're able to initialize an object while `new`ing it up.

```csharp
using System;

public class Program
{
    public static void Main()
    {
        var person = new Person
        {
            GivenName = "John",
            FamilyName = "Doe"
        };

        Console.WriteLine(person.Name); // John Doe
    }
}

public class Person
{
    public string GivenName { get; set; }
    public string FamilyName { get; set; }

    public string Name => $"{GivenName} {FamilyName}";
}
```

However, this specific syntax is not available in TypeScript. We could simply do it long form:

```typescript
class Person {
  givenName: string;
  familyName: string;

  get name(): string { return `${this.givenName} ${this.familyName}`};
}

const person = new Person();
person.givenName = 'John';
person.familyName = 'Doe';

console.log(person.name); // John Doe
```

Or, you can try something like this:

```typescript
// Attribution: This idea is from http://stackoverflow.com/a/14142198/941536
interface Person {
  givenName: string;
  familyName: string;
}

const person: Person = {
  givenName: 'John',
  familyName: 'Doe'
};
```

Note that the previous code example requires that `givenName` and `familyName` **must** be implemented. If that's exactly what you want, this works OK.

But, if `Person` is a `class` instead and you need *getters* or other functionality to work, and you're able to modify this `class`, it might make sense to use the constructor:

```typescript
// Attribution: This idea is from http://stackoverflow.com/a/14226836/941536
class Person {
  constructor(public givenName: string, public familyName: string) {
  }

  get name(): string { return `${this.givenName} ${this.familyName}`};
}

const person = new Person("John", "Doe");

console.log(person.name); // John Doe
```

Alternatively, the constructor could accept and work with an object instead, as suggested in [https://github.com/Microsoft/TypeScript/issues/3895#issuecomment-122046396](https://github.com/Microsoft/TypeScript/issues/3895#issuecomment-122046396).

---

If you've got a better idea *(that's preferably still lightweight)* let me know in the comments!
