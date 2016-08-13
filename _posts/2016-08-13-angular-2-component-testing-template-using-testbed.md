---
layout: post
title: Angular 2 Component Testing Template Using TestBed
tags: angular2 testing
---

`TestBed` was introduced by Angular 2 rc.5. Here's a template for using `TestBed` to test Angular 2 components:

```typescript
// import { provide } from '@angular/core';
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
      // provide(ServiceA, { useClass: TestServiceA })
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
