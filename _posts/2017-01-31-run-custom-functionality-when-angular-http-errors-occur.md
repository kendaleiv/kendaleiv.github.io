---
layout: post
title: Run Custom Functionality When Angular Http Errors Occur
tags: angular
---

Angular includes its own functionality for making HTTP requests. When using it, you may want to react to any errors that happen -- perhaps to display an on-screen error message.

You can achieve that by extending `Http`.

## custom-http.service.ts

```typescript
import { Injectable } from '@angular/core';
import { ConnectionBackend, Http, Request, RequestOptions, RequestOptionsArgs, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

@Injectable()
export class CustomHttpService extends Http {
  constructor(backend: ConnectionBackend, options: RequestOptions) {
    super(backend, options);
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    return super
      .request(url, options)
      .catch(err => {
        console.log(err); // Run any custom functionality here!

        return Observable.throw(err);
      });
  }
}
```

Now, use it in an `NgModule`:

## app.module.ts

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Http, HttpModule, RequestOptions, XHRBackend } from '@angular/http';

import { AppComponent } from './app.component';

import { CustomHttpService } from './custom-http.service';

export function customHttpFactory(backend: XHRBackend, options: RequestOptions) {
  return new CustomHttpService(backend, options);
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [
    {
      provide: Http,
      useFactory: customHttpFactory,
      deps: [XHRBackend, RequestOptions]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
