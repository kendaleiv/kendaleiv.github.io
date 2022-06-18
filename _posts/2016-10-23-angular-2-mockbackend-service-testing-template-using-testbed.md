---
layout: post
title: Angular 2 MockBackend Service Testing Template Using TestBed
tags: angular testing
---

Below is a template for using `TestBed` and `MockBackend` for mocking Angular 2 HTTP calls.

If you want to make *actual* wire calls, see [Angular 2 Services Testing Template]({% post_url 2016-10-23-angular-2-services-testing-template %}) instead.

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

    it('should parse response', async(inject(
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

For a working example see [https://github.com/kendaleiv/angular-testing/blob/master/src/app/stock-retriever.service.spec.ts](https://github.com/kendaleiv/angular-testing/blob/master/src/app/stock-retriever.service.spec.ts).

--

If you're interested, check out [Angular 2 Component Testing Template Using TestBed]({% post_url 2016-10-18-angular-2-component-testing-template-using-testbed %}).
