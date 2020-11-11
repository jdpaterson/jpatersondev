---
template: post
title: Getting Started...how this blog was built pt.1 - What is Gatsby?
slug: getting-started-how-this-blog-was-built-pt-1
draft: false
date: 2020-07-20T14:48:46.815Z
description: "For our first blog entry we'll start with an easy one: how to
  build a blog! We will be looking at Gatsby, Gatsby Starters, Netflify, Netlify
  CMS, and the \"Lumen\" Gatsby Starter in particular."
category: Web Development
tags:
  - gatsby
  - web-frameworks
  - MVC
  - angular
  - react
  - MVW
---
# (Token) Hello, World!

Alright here we are! It is post #1 of this blog and the subject is... building a blog! I'm going to split this up into a number of shorter posts so that I can actually get some content out. So probably a some posts on Gatsby, Netlify, and maybe some for... I dunno, domain hosting or DNS or something. For *this* article we will take an initial brief look at Gatsby: What is it? More specifically, What makes Gatsby a Framework?

## What is the Gatsby Framework?

To be honest with you I'm pretty new to Gatsby so don't expect any crazy in-depth description off the top of my head here, but maybe we can work through it together. According to the Gatsby home page: 

> Gatsby is a free and open source framework based on React that helps developers build blazing fast **websites** and **apps**

And here we have a reference to that infamous *F-word:* framework. Personally, I struggle a bit with what *Framework* often means. In the web-development world we have web-frameworks like Ruby on Rails, Django, and Laravel, among many others. And we also have front-end frameworks like Angular, Vue, and, well actually NOT React. Some googling will demonstrate that Angular and Vue are more opinionated, hence they are considered full-on frameworks, whereas React is not opinionated, and therefore considered only a library. After a quick internet search we get some responses referring to Angular being MVW (Model-View-Whatever) whereas React is just the"V". So, without getting into too much detail, we can see that a *framework* is some structured, opinionated platform built to aid us in software development.

Now we see that Gatsby is a self-proclaimed "framework", and so we can assume, based on the "brief" discussion above, that it will be at least somewhat opinionated, and will have some structure that we must follow to make it work. So what are the opinions of Gatsby, what is the structure to which we must abide? 

Let's take a look at this diagram from the Gatsby web site: 

![Gatsby framework diagram](/media/screen-shot-2020-07-20-at-10.32.18-pm.png "The Gatsby Framework")

So we might now be able to say something like, "Where some frameworks like Rails, and Angular, are based on Model-View-Controller, Gatsby is based on Data Sources-Build-Deploy."

And really that's all that Gatsby is, Data Sources-Build-Deploy. The main idea here with Gatsby is that all of this stuff is more or less prepared for us as soon as we start developing. 

For data-sources we have easy access to CMS' such as Wordpress or Drupal, Markdown documentation or posts (like this blog post), and even Databases etc... 

In the Build stage we have GraphQL set up out of the box, we have React ready to go, and also included is a default Webpack config, to help compile our JSX files. So we see here some of the *opinions* that the Gatsby framework presents: we are to use GraphQL, and we are to use Webpack. 

In the Deploy stage, again, we have many options that are available to us right off the bat. Netlify, AWS, Github Pages etc... 

With all of this functionality set-up for us out of the box, we can start using Gatsby to build our web-apps without going through the hassle of setting up databases, webpack configs, and complicated deploys. 

That is the purpose of Gatsby, a web-framework that helps developers build web-apps quickly, without the pain of set-up and config. Really, I guess that's all I want to say. Actually I think I understand it better after having written this than I did before so... nice one? 

Ok coming up we'll take a look at how we might actually use Gatsby, and eventually we will get to how I very quickly and easily built this blog! Thanks for reading!