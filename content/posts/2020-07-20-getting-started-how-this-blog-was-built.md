---
template: post
title: Getting Started...how this blog was built pt.1 - Gatsby Starters
slug: getting-started-how-this-blog-was-built-pt-1
draft: true
date: 2020-07-20T14:48:46.815Z
description: "For our first blog entry we'll start with an easy one: how to
  build a blog! We will be looking at Gatsby, Gatsby Starters, Netflify, Netlify
  CMS, and the \"Lumen\" Gatsby Starter in particular."
category: Web Development
tags:
  - gatsby
  - netlify
  - netlify-cms
  - gatbsy starters
  - lumen
  - blog
---
# (Token) Hello, World!

Alright here we are! It is post #1 of this blog and the subject is... building a blog! I'm going to split this up into 2-3 posts for the sake of brevity. So probably a post for Gatsby, a post for Netlify, and maybe another for... I dunno, domain hosting or DNS or something. For *this* article we will take a brief look at Gatsby: What is it? Why use it? And how it was used to build this blog. 

## What is Gatsby?

To be honest with you I'm pretty new to Gatsby so don't expect any crazy in-depth description off the top of my head here, but maybe we can work through it together. According to the Gatsby home page: 

> Gatsby is a free and open source framework based on React that helps developers build blazing fast **websites** and **apps**

And here we have a reference to that infamous *F-word:* framework. Personally, I struggle a bit with what *Framework* often means. In the web-development world we have web-frameworks like Ruby on Rails, Django, and Laravel, among many others. And we also have front-end frameworks like Angular, Vue, and, well actually NOT React. I think because Angular and Vue are more opinionated, they are considered full-on frameworks, whereas React is less opinionated, and therefore considered only a library. Googling this will give you better insight than I can here. If we google it we get some response referring to Angular being MVW (Model-View-Whatever) whereas React is just the"V". So, without getting into too much detail, we can see that a framework is some structured, opinionated platform built to aid us in software development.

Now we see that Gatsby is a self-proclaimed "framework", and so we can assume, based on the "brief" discussion above, that it will be at least somewhat opinionated, and will have some structure that we must follow to make it work. So what are the opinions of Gatsby, what is the structure to which we must abide?