---
layout: post
title: Violin Backed by Gibber
tags: music violin gibber
---

As a developer, do you frequently find yourself longing for a backup band to your melodic instrument? If this sounds like you *(or, even if it doesn't)*, check this out:

<iframe width="560" height="315" src="https://www.youtube.com/embed/zZLAGBgGQhA" frameborder="0" allowfullscreen></iframe>

## The Gibber code

```javascript
// Roland TR-808 simulation:
// Kick, rest, snare, rest, kick, kick, snare, rest
a = XOX('x.o.xxo.')

// Closed hihat, eighth notes
b = Drums('********')

c = FM('bass').note.seq(
  ['g', 'g', 'g', 'g', 'd', 'd', 'd', 'd', 'c', 'c', 'c', 'c', 'd', 'd', 'd', 'd'],
  1/4)
c.amp = .3

d = Synth2({ maxVoices: 3, decay: 1/2 }).chord.seq(
  ['g3', 'd3', 'c3', 'd3'],
  1)
d.amp = .5
```

## In closing

Give **Gibber** a try at [http://gibber.mat.ucsb.edu/](http://gibber.mat.ucsb.edu/).

If you're wondering what **Gibber** is check out [http://charlie-roberts.com/gibber/about-gibber](http://charlie-roberts.com/gibber/about-gibber).

**Note:** As of the date of this blog post, **Gibber** doesn't play audio for me using Chrome 46 _(64-bit)_ on Windows 10. It does work for me using Firefox 42 _(32-bit, I assume, it's installed in my **Program Files (x86)** folder)_ on Windows 10, though.
