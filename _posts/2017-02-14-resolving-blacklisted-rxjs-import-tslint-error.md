---
layout: post
title: Resolving Blacklisted RxJS Import TSLint Error
---

When working with Angular and the Angular CLI, one might `import` an RxJS `Observable` as:

```typescript
import { Observable } from 'rxjs';
```

Later, running TSLint reports `This import is blacklisted, import a submodule instead`.

## Quick fix

To fix the error reported by TSLint, simply change

```typescript
import { Observable } from 'rxjs';
```

to

```typescript
import { Observable } from 'rxjs/Observable';
```

Now, run TSLint and the error should be gone! However, this change may have created compilation error(s), potentially requiring importing some operators.

## Import operators (as necessary)

After making this change, some operators may need to be imported. Here's how to import `map`:

```typescript
import 'rxjs/add/operator/map';
```

## Extra

This blacklisted import can be found in **tslint.json** as:

```json
{
  "rules": {
    "import-blacklist": [true, "rxjs"]
  }
}
```
