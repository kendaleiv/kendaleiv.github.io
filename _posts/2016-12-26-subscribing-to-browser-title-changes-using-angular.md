---
layout: post
title: Subscribing to Browser Title Changes Using Angular
tags: angular
---

Angular includes a [`Title`](https://angular.io/docs/js/latest/api/platform-browser/index/Title-class.html) service, which includes `getTitle(): string` and `setTitle(newTitle: string)`. If you want to keep an in-page header matching the browser `title` tag, you'll need something to enable that possibility.

If you like the pattern of subscribing to changes (as you might be, if you're using Angular), check out the following `SubscribableTitleService`:

```typescript
//
// src/app/subscribable-title.service.ts
//

import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class SubscribableTitleService {
  public title: BehaviorSubject<string>;

  constructor(private titleService: Title) {
    this.title = new BehaviorSubject<string>(titleService.getTitle());
  }

  setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);

    this.title.next(newTitle);
  }
}
```

Now, to use it in a page header:

```typescript
//
// src/app/header/header.component.ts
//

import { Component, OnInit } from '@angular/core';

import { SubscribableTitleService } from '../subscribable-title.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public headerText: string;

  constructor(private subscribableTitleService: SubscribableTitleService) { }

  ngOnInit() {
    this.subscribableTitleService.title.subscribe(title => {
      this.headerText = title;
    });
  }
}
```

With the following or similar **src/app/header/header.component.html** file:

```html
{% raw %}<h1>{{ headerText }}</h1>{% endraw %}
```

## Credit

Credit to [https://hassantariqblog.wordpress.com/2016/12/03/angular2-set-page-title-dynamically-as-angular-service-in-angular-2-application/](https://hassantariqblog.wordpress.com/2016/12/03/angular2-set-page-title-dynamically-as-angular-service-in-angular-2-application/) for a similar strategy, but this blog post's `SubscribableTitleService` adds functionality for manipulating the browser's title tag.
