---
layout: post
title: Angular 2 Services Testing Template
tags: angular testing
---

Here's a simple template for testing Angular 2 services.

If the `HttpModule` portions are uncommented and used, it will make *actual* wire calls. To use mock calls instead, see [Angular 2 MockBackend Service Testing Template Using TestBed]({% post_url 2016-10-23-angular-2-mockbackend-service-testing-template-using-testbed %}) instead.

```typescript
import { async, inject, TestBed } from '@angular/core/testing';
// import { HttpModule } from '@angular/http';

import { SomeService } from './some.service';

describe('SomeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SomeService
      ],
      imports: [
        // HttpModule
      ]
    });
  });

  it('should construct', async(inject([SomeService], (service) => {
    expect(service).toBeDefined();
  })));
});
```

Also, if you're looking for a component testing template, see [Angular 2 Component Testing Template Using TestBed]({% post_url 2016-10-18-angular-2-component-testing-template-using-testbed %}).
