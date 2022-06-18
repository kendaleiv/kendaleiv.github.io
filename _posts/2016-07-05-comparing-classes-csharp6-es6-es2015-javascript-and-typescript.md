---
layout: post
title: "Comparing Classes: C# 6, ES6/ES2015 JavaScript, and TypeScript"
tags: csharp javascript typescript
---

Classes are a useful construct typically associated with [object-oriented programming](https://en.wikipedia.org/wiki/Object-oriented_programming).

In C# classes are a first-class construct of the language. Classes were introduced a bit later for JavaScript. Classes in JavaScript are simply *syntactic sugar*.

## C# 6

```csharp
public class Person
{
    private readonly SomeDependency _someDependency;
    
    public Person(SomeDependency someDependency)
    {
        _someDependency = someDependency;
    }
    
    public string GivenName { get; set; }
    public string FamilyName { get; set; }
    
    public string Name => $"{GivenName} {FamilyName}";
}

public class SomeDependency { }

// Usage:
var person = new Person(new SomeDependency());

person.GivenName = "Ken";
person.FamilyName = "Dale";

Console.WriteLine(person.Name); // Ken Dale
```

## JavaScript (ES6 / ES2015)

```javascript
class Person {
  constructor(someDependency) {
    this.someDependency = someDependency;
  }

  get name() { return `${this.givenName} ${this.familyName}`; }
}

class SomeDependency {
}

// Usage:
const person = new Person(new SomeDependency());
person.givenName = "Ken";
person.familyName = "Dale";

console.log(person.name); // Ken Dale
```

## TypeScript v1

```typescript
class Person {
  constructor(public someDependency: SomeDependency) {
  }

  givenName: string;
  familyName: string;

  get name(): string { return `${this.givenName} ${this.familyName}`; };
}

class SomeDependency { }

// Usage:
const person = new Person(new SomeDependency());
person.givenName = "Ken";
person.familyName = "Dale";

console.log(person.name); // Ken Dale
```

I hope this brings clarity by comparing these different languages.
