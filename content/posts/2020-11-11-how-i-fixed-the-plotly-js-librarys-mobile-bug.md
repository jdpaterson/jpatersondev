---
template: post
title: How I Fixed the Plotly.js Library's Mobile Bug
slug: how-i-fixed-the-plotly-js-library-mobile-bug
draft: true
date: 2020-11-11T03:04:32.949Z
description: Commit
category: Coding
tags:
  - plotly
  - open-source
  - dash
  - python
  - source tree
  - git
  - javascript
  - ""
---
Recently, our team had built a demo of Artificial Intelligence at work, which you can (eventually) [see here](https://ai-demo.cctech.io/). This demo uses the Python-based [Dash library](https://plotly.com/dash/) to efficiently render large amounts of data on some 2D or 3D chart, ideal for ML/AL data visualization. Anyway, I wasn't particularly involved in that aspect, but I was assigned the task of fixing a bug in the 3D Scatterplot that we were using. In this post I would like to explain how, by fixing the bug in the open-source library that drives Dash, I was able to resolve [this bug](https://github.com/plotly/plotly.js/issues/4550) not only for my team, but for the whole world! 

Ok so what was the bug? Well it was actually pretty significant, essentially everything worked fine on desktop devices, one could maneuvre the 3D Scatterplot left-right-up-down using mouse-clicks, and the user could click on a point in the graph and see information about the point that they clicked. All well and good, the problem came when you were on a mobile device. The user could still maneuvre the scatterplot up-down-left-right, but when they tried to click on a point, nothing happened! So, how do we fix such an issue? 

Actually the first thing I tried, after some simple testing of our implementation of the Dash component itself, was to try a different Scatterplot entirely. Since Dash allows us to [use any (even custom) React components](https://dash.plotly.com/react-for-python-developers), we tried some other 3rd party libraries but realized that while those components in fact did work properly on mobile, they were not using [WebGL](https://get.webgl.org/), which is the fastest way to render large amounts of data, so with the amount of data that we were using, they were rendering too slowly. Dash uses WebGL, so it is really the optimal way to render ML/AI data. 

![Elaine from Seinfeld says ada yada yaday](/media/when-elaine-yada-yada-yadas-sex.gif "Yada yada yada")

Ok so I tried some things, wasn't really getting any great results. I then thought about it a bit and realized, there's no way that this functionality is by design, maybe at some point it was actually working properly in the Dash library, and at some point a regression was introduced. So I posted a [simple question to the Plotly Community Forums](https://community.plotly.com/t/clicking-nodes-in-3d-scatterplot-on-mobile/46563), just wondering whether I am missing something completely, because it seems like this should be standard functionality. The people there generously responded quickly, and pointed me to an existing Github issue. Alright! We have something to work with now :) 

The [Github issue ](https://github.com/plotly/plotly.js/issues/4550)in question actually stated that this functionality was working before v1.34.0. So I thought, ok, if I can go back to v1.33.0, and see what changed up until v1.34.0, then I'll be able to isolate the breaking change. 

So we did [a little fork-er-oony](https://github.com/jdpaterson/plotly.js) and a little clone-er-oony (and notice that the bug is not actually on the Dash library as expected, but on the Plotly.js library, which is a dependency of Dash), and spun up our old friend [SourceTree](https://www.sourcetreeapp.com/), so that we could easily navigate back, in time, to a simpler time, a time when... well dinosaurs didn't exactly roam the earth, but the plotly.js library didn't have a mobile bug in it! Look, we went back to 2018. We all have fond memories of 2018 no? Before any such talks of global pandemics etc... actually, I challenge you, YOU, take 30 seconds right now and think of something great that happened to you in 2018. Got something? Good, remember that! hey btw, January 2018 -> October 2020 is a LONG time for a bug that breaks core functionality on mobile!

![Plotly.js SourceTree image shows v1.33.0 was in January 2018](/media/plotly-sourcetree-1.33.1.png "Plotly.js SourceTree")

Ok so we checked out v1.33.0 and tested it out, and in fact, as expected, the functionality that we are craving was working perfectly fine. So now we just need to find which commit in between v1.33.0 and v1.34.0 was the breaking commit. I was able to narrow it down by looking at which files had been changed at each commit, some were obviously not the culprit, others were suspects. Eventually I narrowed it down to [this commit](https://github.com/plotly/plotly.js/commit/fa1db3bda0688d76ee844970fa4d0e904afa8323) .

Almost there people! Bear with me now. Ok so we look at what was changed in this commit, and we see that the committer was implementing something to do with Passive Events, and that from some of the commit messages aroudn that time, they were fixing an issue where the scroll bar was being interupted by the user's interaction with the graph. So whatever our fix is, we need to also keep the scroll bar fix in tact. Here's an example of how the files were changed: 

![Javascript code which shows a repeated example of ev.preventDefault() and implementing passive events](/media/plotly-sourcetree-passive-events-example.png "v1.33.1 code change snippet")

So somewhere in these few lines of code lies our answer. So I checked out this commit, and I played around with some of the values, and found that if I changed the `{ passive: false }` param to `{ passive: true }` that this actually fixed my problem! Though it broke the solution that the original commit was trying to fix. So I did a little bit more research on [touchevents in JS](https://developer.mozilla.org/en-US/docs/Web/API/Touch_events), and I found this little piece in the documentation that states the following:

```
Since calling preventDefault() on a touchstart or the first touchmove event of a series prevents the corresponding mouse events from firing, it's common to call preventDefault() on touchmove rather than touchstart. That way, mouse events can still fire and things like links will continue to work. 
```

So with that suggestion in mind, I simply removed the `ev.preventDefault()`s from the `touchstart` and `touchend` event listeners, and left it in the `touchmove` listener, and voila! Everything was working! [See this commit for the solution](https://github.com/gl-vis/gl-plot3d/pull/31/commits/8f96f0362366394a188b2f7451faf4b48da85433).

At this point it was just a matter of coordinating with the folks at Plotly where to submit my PRs, turns out the original code had been moved to a [separate library](https://github.com/gl-vis/gl-plot3d/) so I had to make my PR there, and then submit a [version bump PR ](https://github.com/plotly/plotly.js/pull/5239)to the Plotly.js library. Eventually these changes will be reflected in the dash-core-components library when they upgrade their version of plotly.js.

Thanks for reading!