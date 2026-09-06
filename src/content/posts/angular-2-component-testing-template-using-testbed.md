---
title: "Angular 2 Component Testing Template Using TestBed"
slug: angular-2-component-testing-template-using-testbed
pubDatetime: 2016-10-18T00:00:00-04:00
description: "A reusable TestBed template for testing Angular 2 components."
tags: ["angular", "testing"]
---

Below is a template for using `TestBed` to test Angular 2 components.

```typescript
import { async, TestBed } from '@angular/core/testing';

import { SomeComponent } from './some.component';

beforeEach(() => {
  TestBed.configureTestingModule({
    declarations: [
      SomeComponent
    ],
    imports: [
      // HttpModule, etc.
    ],
    providers: [
      // { provide: ServiceA, useClass: TestServiceA }
    ]
  });
});

it('should do something', async(() => {
  // Overrides here, if you need them
  TestBed.overrideComponent(SomeComponent, {
    set: {
      template: '<div>Overridden template here</div>'
      // ...
    }
  });

  TestBed.compileComponents().then(() => {
    const fixture = TestBed.createComponent(SomeComponent);

    // Access the dependency injected component instance
    const app = fixture.componentInstance;

    expect(app.something).toBe('something');

    // Access the element
    const element = fixture.nativeElement;

    // Detect changes as necessary
    fixture.detectChanges();

    expect(element.textContent).toContain('something');
  });
}));
```

For a template showing `MockBackend` usage while testing a service with `TestBed`, see [Angular 2 MockBackend Service Testing Template Using TestBed](/angular-2-mockbackend-service-testing-template-using-testbed/).
