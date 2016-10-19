---
layout: post
title: Angular 2 MockBackend Service Testing Template Using TestBed
tags: angular2 testing
---

Below is a template for using `TestBed` and `MockBackend` for mocking Angular 2 HTTP calls. Let me know in the comments if I've missed something noteworthy!

```typescript
import { async, inject, TestBed } from '@angular/core/testing';
import { BaseRequestOptions, Http, HttpModule, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { SomeService } from './some.service';

describe('SomeService (Mocked)', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SomeService,

        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backend, options) => new Http(backend, options),
          deps: [MockBackend, BaseRequestOptions]
        }
      ],
      imports: [
        HttpModule
      ]
    });
  });

  it('should construct', async(inject(
    [SomeService, MockBackend], (service, mockBackend) => {

    expect(service).toBeDefined();
  })));

  describe('someMethod', () => {
    const mockResponse = {
      color: 'blue'
    };

    it('should parse response from endpoint', async(inject(
      [SomeService, MockBackend], (service, mockBackend) => {

      mockBackend.connections.subscribe(conn => {
        conn.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify(mockResponse) })));
      });

      const result = service.someMethod();

      result.subscribe(res => {
        expect(res).toEqual({
          color: 'blue'
        });
      });
    })));
  });
});
```

For a working example see [https://github.com/kendaleiv/angular2-testing/blob/master/src/app/stock-retriever.service.spec.ts](https://github.com/kendaleiv/angular2-testing/blob/master/src/app/stock-retriever.service.spec.ts).

--

If you're interested, check out [Angular 2 Component Testing Template Using TestBed]({% post_url 2016-09-15-angular-2-component-testing-template-using-testbed %}).
