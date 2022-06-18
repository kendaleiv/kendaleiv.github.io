---
layout: post
title: Comparing Angular NgModule and TestBed Side by Side
tags: angular
---

`TestBed`'s `configureTestingModule` method looks similar to `NgModule` in usage. Check out this side by side example:

```typescript
@NgModule({                        |     TestBed.configureTestingModule({
                                   |
    declarations:[                 |       declarations: [
      AppComponent,                |         AppComponent,
      CurrentResultsComponent,     |         CurrentResultsComponent,
      ResultsLogComponent          |         ResultsLogComponent
    ],                             |       ],
    imports: [                     |       imports: [
      BrowserModule,               |         FormsModule,
      FormsModule,                 |         HttpModule
      HttpModule                   |
    ],                             |       ],
    providers: [                   |       providers: [
      StockRetrieverService        |         {
    ],                             |           provide: StockRetrieverService,
                                   |           useClass: TestStockRetrieverService
                                   |         }
                                   |       ]
                                   |
                                   |
    bootstrap: [AppComponent]      |
  })                               |
  export class AppModule { }       |     });
```

For a full example see the [https://github.com/kendaleiv/angular-testing](https://github.com/kendaleiv/angular-testing) repository.
